"use client"

import { useEffect, useState } from "react"
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPerformanceVsAttendance } from "@/lib/routes"
import { useTheme } from "next-themes"

export default function PerformanceVsAttendanceChart() {
  const [data, setData] = useState<Array<{
    name: string
    avg_grade: string
    attendance_percentage: string
  }> | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getPerformanceVsAttendance()

      if (response.data) {
        setData(response.data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const chartData = data?.map((item) => ({
    name: item.name,
    attendance: Number.parseFloat(item.attendance_percentage),
    grade: Number.parseFloat(item.avg_grade),
    z: 1,
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Performance vs Attendance</CardTitle>
        <CardDescription>Correlation between grades and attendance</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis
                type="number"
                dataKey="attendance"
                name="Attendance"
                domain={[0, 100]}
                label={{ value: "Attendance %", position: "bottom", offset: 0, fill: '#aaa', fontSize: 13 }}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#aaa', fontSize: 13 }}
              />
              <YAxis
                type="number"
                dataKey="grade"
                name="Grade"
                domain={[70, 100]}
                label={{ value: "Grade", angle: -90, position: "left", fill: '#aaa', fontSize: 13 }}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#aaa', fontSize: 13 }}
              />
              <ZAxis type="number" dataKey="z" range={[60, 200]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3", stroke: '#6C63FF', opacity: 0.2 }}
                wrapperStyle={{ fontFamily: 'Century Gothic, Arial, sans-serif' }}
                contentStyle={{ background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#222', border: 'none', borderRadius: 8, fontSize: 14 }}
                formatter={(value, name) => [value, name === "attendance" ? "Attendance %" : "Grade"]}
                labelFormatter={(value, payload) => payload[0]?.payload?.name || ""}
              />
              <Scatter name="Students" data={chartData} fill="#6C63FF" shape="circle" />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

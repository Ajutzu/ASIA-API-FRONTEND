"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getAttendanceBreakdown } from "@/lib/routes"
import { useTheme } from "next-themes"

export default function AttendanceBreakdownChart() {
  const [data, setData] = useState<Array<{ status_name: string; count: number }> | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getAttendanceBreakdown()

      if (response.data) {
        setData(response.data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const chartData = data?.map((item) => ({
    name: item.status_name,
    value: item.count,
  }))

  const COLORS = ["#6C63FF", "#8D85FF", "#B3AEFF", "#D6D4FF"]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Attendance Breakdown</CardTitle>
        <CardDescription>Distribution of attendance statuses</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} contentStyle={{ background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#222', border: 'none', borderRadius: 8, fontSize: 14 }} formatter={(value) => [`${value}`, "Count"]} labelFormatter={(value) => `${value}`} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

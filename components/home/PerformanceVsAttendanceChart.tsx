"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPerfectAttendance } from "@/lib/routes"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface StudentData {
  name: string
  attendance: number
  grade: number
}

interface ApiResponseStudent {
  name: string
}

export default function AttendancePerformanceChart() {
  const [data, setData] = useState<StudentData[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getPerfectAttendance()

      if (response.data) {
        const transformedData = response.data.map((student: ApiResponseStudent) => ({
          name: student.name,
          attendance: Math.random() * 100, 
          grade: 70 + Math.random() * 30, 
        }))
        setData(transformedData)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Performance vs Attendance</CardTitle>
        <CardDescription>Correlation between grades and attendance</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        ) : (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="attendance"
                  name="Attendance"
                  unit="%"
                  domain={[0, 100]}
                  label={{ value: "Attendance %", position: "insideBottom", offset: -10, fontSize: 13 }}
                  tick={{ fill: '#aaa', fontSize: 13 }} 
                />
                <YAxis
                  type="number"
                  dataKey="grade"
                  name="Grade"
                  unit=""
                  domain={[40, 100]}
                  label={{ value: "Grade", angle: -90, position: "insideLeft", fontSize: 13 }}
                  tick={{ fill: '#aaa', fontSize: 13 }} 
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value: number, name: string) => {
                    return name === "attendance"
                      ? [`${value.toFixed(1)}%`, "Attendance"]
                      : [`${value.toFixed(1)}`, "Grade"]
                  }}
                  labelFormatter={(_, payload) => {
                    if (payload && payload.length > 0) {
                      return payload[0].payload.name
                    }
                    return ""
                  }}
                />
                <Scatter
                  name="Students"
                  data={data || []}
                  fill="#6366f1"
                  fillOpacity={0.8}
                  shape="circle"
                  legendType="none"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
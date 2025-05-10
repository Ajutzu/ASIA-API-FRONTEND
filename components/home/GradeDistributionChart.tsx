"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getGradeDistribution } from "@/lib/routes"
import { useTheme } from "next-themes"

export default function GradeDistributionChart() {
  const [data, setData] = useState<Array<{ subject_name: string; avg_score: string }> | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getGradeDistribution()

      if (response.data) {
        setData(response.data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const chartData = data?.map((item) => ({
    subject: item.subject_name,
    score: Number.parseFloat(item.avg_score),
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Grade Distribution</CardTitle>
        <CardDescription>Average scores by subject</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#444" />
              <XAxis type="number" domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fill: '#aaa', fontSize: 13 }} />
              <YAxis dataKey="subject" type="category" width={100} axisLine={false} tickLine={false} tick={{ fill: '#aaa', fontSize: 13 }} />
              <Tooltip wrapperStyle={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} contentStyle={{ background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#222', border: 'none', borderRadius: 8, fontSize: 14 }} cursor={{ fill: '#333', opacity: 0.1 }} formatter={(value) => [`${value}`, "Average Score"]} labelFormatter={(value) => `${value}`} />
              <Bar dataKey="score" fill="#6C63FF" radius={[0, 8, 8, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

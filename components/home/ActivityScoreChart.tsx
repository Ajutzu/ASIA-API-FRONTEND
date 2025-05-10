"use client"

import { useEffect, useState } from "react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getActivityScoreAverage } from "@/lib/routes"
import { useTheme } from "next-themes"

export default function ActivityScoreChart() {
  const [data, setData] = useState<Array<{ type_name: string; avg_score: string }> | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getActivityScoreAverage()

      if (response.data) {
        setData(response.data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const chartData = data?.map((item) => ({
    activity: item.type_name,
    score: Number.parseFloat(item.avg_score),
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Activity Performance</CardTitle>
        <CardDescription>Average scores by activity type</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis dataKey="activity" tick={{ fill: '#aaa', fontSize: 13 }} />
              <PolarRadiusAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fill: '#aaa', fontSize: 13 }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#6C63FF"
                fill="#6C63FF"
                fillOpacity={0.5}
              />
              <Tooltip wrapperStyle={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} contentStyle={{ background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#222', border: 'none', borderRadius: 8, fontSize: 14 }} formatter={(value) => [`${value}`, "Average Score"]} labelFormatter={(value) => `${value}`} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

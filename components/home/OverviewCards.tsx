"use client"

import { useEffect, useState } from "react"
import { Award, BookOpen, Percent, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getTotalStudents, getAverageGrade, getAttendanceRate, getTopPerformers } from "@/lib/routes"

export default function OverviewCards() {
  const [totalStudents, setTotalStudents] = useState<number | null>(null)
  const [averageGrade, setAverageGrade] = useState<string | null>(null)
  const [attendanceRate, setAttendanceRate] = useState<string | null>(null)
  const [topPerformers, setTopPerformers] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const [studentsResponse, gradeResponse, attendanceResponse, performersResponse] = await Promise.all([
        getTotalStudents(),
        getAverageGrade(),
        getAttendanceRate(),
        getTopPerformers(),
      ])

      if (studentsResponse.data) setTotalStudents(studentsResponse.data.total_students)
      if (gradeResponse.data) setAverageGrade(gradeResponse.data.avg_grade)
      if (attendanceResponse.data) setAttendanceRate(attendanceResponse.data.attendance_rate)
      if (performersResponse.data) setTopPerformers(performersResponse.data.top_performers)

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{totalStudents || 0}</div>}
          <p className="text-xs text-muted-foreground">Currently enrolled students</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <div className="text-2xl font-bold">{averageGrade || "0.00"}</div>
          )}
          <p className="text-xs text-muted-foreground">Overall average grade</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <div className="text-2xl font-bold">{attendanceRate || "0.00"}%</div>
          )}
          <p className="text-xs text-muted-foreground">Overall attendance rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{topPerformers || 0}</div>}
          <p className="text-xs text-muted-foreground">Students with 90+ average</p>
        </CardContent>
      </Card>
    </div>
  )
}

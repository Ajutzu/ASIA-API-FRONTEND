"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPerfectAttendance } from "@/lib/routes"

export default function PerfectAttendanceList() {
  const [data, setData] = useState<Array<{ name: string }> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getPerfectAttendance()

      if (response.data) {
        setData(response.data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Perfect Attendance</CardTitle>
        <CardDescription>Students with 100% attendance</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        ) : (
          <div className="space-y-4 h-74 pe-5 overflow-y-auto">
            {data?.map((student, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {/* Placeholder avatar SVG */}
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#22242A" />
                      <ellipse cx="16" cy="13" rx="6" ry="6" fill="#fff" />
                      <ellipse cx="16" cy="25" rx="9" ry="5" fill="#fff" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold leading-tight">{student.name}</span>
                    <span className="text-xs text-muted-foreground">Perfect Attendance Award</span>
                  </div>
                </div>
                <div>
                  <button className="bg-muted px-3 py-1 rounded-lg text-xs font-medium text-foreground/80 border border-border">Student</button>
                </div>
              </div>
            ))}
            {data?.length === 0 && <p className="text-muted-foreground text-sm">No students with perfect attendance</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

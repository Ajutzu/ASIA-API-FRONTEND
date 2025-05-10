
interface ApiResponse<T> {
  data: T | null
  error: string | null
}

// Helper function to make API requests with the API key
async function fetchWithApiKey<T>(url: string): Promise<ApiResponse<T>> {
 
  try {
    const response = await fetch(url, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.error("API request failed:", error)
    return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
  }
  
}

// Base URL for the API
const BASE_URL = "https://asia-api-backend.onrender.com"

// API functions for each endpoint
export async function getTotalStudents() {
  return fetchWithApiKey<{ total_students: number }>(`${BASE_URL}/api/analytics/total-students`)
}

export async function getAverageGrade() {
  return fetchWithApiKey<{ avg_grade: string }>(`${BASE_URL}/api/analytics/average-grade`)
}

export async function getAttendanceRate() {
  return fetchWithApiKey<{ attendance_rate: string }>(`${BASE_URL}/api/analytics/attendance-rate`)
}

export async function getTopPerformers() {
  return fetchWithApiKey<{ top_performers: number }>(`${BASE_URL}/api/analytics/top-performers`)
}

export async function getMonthlyGradeTrend() {
  return fetchWithApiKey<Array<{ month: string; avg_grade: string }>>(`${BASE_URL}/api/analytics/monthly-grade-trend`)
}

export async function getGradeDistribution() {
  return fetchWithApiKey<Array<{ subject_name: string; avg_score: string }>>(`${BASE_URL}/api/analytics/grade-distribution`)
}

export async function getAttendanceBreakdown() {
  return fetchWithApiKey<Array<{ status_name: string; count: number }>>(`${BASE_URL}/api/analytics/attendance-breakdown`)
}

export async function getPerformanceVsAttendance() {
  return fetchWithApiKey<
    Array<{
      name: string
      avg_grade: string
      attendance_percentage: string
    }>
  >(`${BASE_URL}/api/analytics/performance-vs-attendance`)
}

export async function getGenderDistribution() {
  return fetchWithApiKey<Array<{ gender_name: string; count: number }>>(`${BASE_URL}/api/analytics/gender-distribution`)
}

export async function getPerfectAttendance() {
  return fetchWithApiKey<Array<{ name: string }>>(`${BASE_URL}/api/analytics/perfect-attendance`)
}

export async function getActivityScoreAverage() {
  return fetchWithApiKey<Array<{ type_name: string; avg_score: string }>>(`${BASE_URL}/api/analytics/activity-score-average`)
}
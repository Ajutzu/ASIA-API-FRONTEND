import Navbar from "@/components/home/Navbar";
import OverviewCards from "@/components/home/OverviewCards";
import GenderDistributionChart from "@/components/home/GenderDistributionChart";
import GradeDistributionChart from "@/components/home/GradeDistributionChart";
import AttendanceBreakdownChart from "@/components/home/AttendanceBreakdownChart";
import MonthlyGradeTrendChart from "@/components/home/MonthlyGradeTrendChart";
import ActivityScoreChart from "@/components/home/ActivityScoreChart";
import PerformanceVsAttendanceChart from "@/components/home/PerformanceVsAttendanceChart";
import PerfectAttendanceList from "@/components/home/PerfectAttendanceList";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 container border-x-2 border-dashed py-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive overview of student performance metrics
              </p>
            </div>
          </div>

          <OverviewCards />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GradeDistributionChart />
            <AttendanceBreakdownChart />
            <GenderDistributionChart />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MonthlyGradeTrendChart />
            <ActivityScoreChart />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceVsAttendanceChart />
            <PerfectAttendanceList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

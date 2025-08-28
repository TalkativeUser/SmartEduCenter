"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { DashboardLayout } from "../../components/dashboard-layout"
import { useAppSelector } from "../../hooks/redux"
import { Users, BookOpen, GraduationCap, TrendingUp, Award, Play, FileText, MessageSquare } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function DashboardPage() {
  const { user, language } = useAppSelector((state) => ({
    user: state.auth.user,
    language: state.ui.language,
  }))

  // Mock data for charts
  const attendanceData = [
    { name: "Mon", attendance: 95 },
    { name: "Tue", attendance: 88 },
    { name: "Wed", attendance: 92 },
    { name: "Thu", attendance: 85 },
    { name: "Fri", attendance: 90 },
  ]

  const gradeDistribution = [
    { name: "A", value: 25, color: "#10B981" },
    { name: "B", value: 35, color: "#3B82F6" },
    { name: "C", value: 25, color: "#F59E0B" },
    { name: "D", value: 10, color: "#EF4444" },
    { name: "F", value: 5, color: "#6B7280" },
  ]

  const performanceData = [
    { month: "Jan", score: 85 },
    { month: "Feb", score: 88 },
    { month: "Mar", score: 82 },
    { month: "Apr", score: 90 },
    { month: "May", score: 87 },
    { month: "Jun", score: 92 },
  ]

  const stats = [
    {
      name: language === "en" ? "Total Students" : "إجمالي الطلاب",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      name: language === "en" ? "Active Classes" : "الفصول النشطة",
      value: "48",
      change: "+3%",
      changeType: "positive" as const,
      icon: BookOpen,
    },
    {
      name: language === "en" ? "Average Grade" : "المتوسط العام",
      value: "87.5%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: GraduationCap,
    },
    {
      name: language === "en" ? "Attendance Rate" : "معدل الحضور",
      value: "94.2%",
      change: "-1.2%",
      changeType: "negative" as const,
      icon: TrendingUp,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "assignment",
      title: language === "en" ? "Math Assignment Due" : "واجب الرياضيات مستحق",
      time: language === "en" ? "2 hours ago" : "منذ ساعتين",
      icon: FileText,
    },
    {
      id: 2,
      type: "message",
      title: language === "en" ? "New message from parent" : "رسالة جديدة من ولي الأمر",
      time: language === "en" ? "4 hours ago" : "منذ 4 ساعات",
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "grade",
      title: language === "en" ? "Grades updated for Science" : "تم تحديث درجات العلوم",
      time: language === "en" ? "1 day ago" : "منذ يوم واحد",
      icon: Award,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: language === "en" ? "Parent-Teacher Conference" : "اجتماع أولياء الأمور والمعلمين",
      date: language === "en" ? "Tomorrow, 2:00 PM" : "غداً، 2:00 مساءً",
      type: "meeting",
    },
    {
      id: 2,
      title: language === "en" ? "Science Fair" : "معرض العلوم",
      date: language === "en" ? "Friday, 9:00 AM" : "الجمعة، 9:00 صباحاً",
      type: "event",
    },
    {
      id: 3,
      title: language === "en" ? "Math Quiz" : "اختبار الرياضيات",
      date: language === "en" ? "Next Monday, 10:00 AM" : "الاثنين القادم، 10:00 صباحاً",
      type: "quiz",
    },
  ]

  const videos = [
    {
      id: 1,
      title: language === "en" ? "Introduction to Algebra" : "مقدمة في الجبر",
      duration: "15:30",
      thumbnail: "/algebra-lesson.png",
    },
    {
      id: 2,
      title: language === "en" ? "World History Overview" : "نظرة عامة على التاريخ العالمي",
      duration: "22:45",
      thumbnail: "/history-lesson.png",
    },
    {
      id: 3,
      title: language === "en" ? "Chemistry Basics" : "أساسيات الكيمياء",
      duration: "18:20",
      thumbnail: "/chemistry-lesson.png",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 text-white hover-lift animate-fade-in">
          <h1 className="text-2xl font-bold mb-2 gradient-text">
            {language === "en" ? `Welcome back, ${user?.name}!` : `مرحباً بعودتك، ${user?.name}!`}
          </h1>
          <p className="text-blue-100">
            {language === "en" ? "Here's what's happening in your school today." : "إليك ما يحدث في مدرستك اليوم."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={stat.name} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center animate-bounce-in">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {language === "en" ? "from last month" : "من الشهر الماضي"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <Card className="hover-lift animate-slide-in-left">
            <CardHeader>
              <CardTitle>{language === "en" ? "Weekly Attendance" : "الحضور الأسبوعي"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="hsl(var(--primary))" className="animate-bounce-in" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card className="hover-lift animate-slide-in-right">
            <CardHeader>
              <CardTitle>{language === "en" ? "Grade Distribution" : "توزيع الدرجات"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    className="animate-bounce-in"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trend */}
        <Card className="hover-lift animate-fade-in">
          <CardHeader>
            <CardTitle>{language === "en" ? "Performance Trend" : "اتجاه الأداء"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  className="animate-bounce-in"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="hover-lift animate-slide-in-left">
            <CardHeader>
              <CardTitle>{language === "en" ? "Recent Activities" : "الأنشطة الحديثة"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle>{language === "en" ? "Upcoming Events" : "الأحداث القادمة"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                    <Badge variant="outline" className="animate-bounce-in">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Videos Section */}
          <Card className="hover-lift animate-slide-in-right">
            <CardHeader>
              <CardTitle>{language === "en" ? "Recent Videos" : "الفيديوهات الحديثة"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="flex items-center space-x-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative hover-lift">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-16 h-12 object-cover rounded transition-transform duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{video.title}</p>
                      <p className="text-xs text-muted-foreground">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 hover-lift animate-glow bg-transparent">
                {language === "en" ? "View All Videos" : "عرض جميع الفيديوهات"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

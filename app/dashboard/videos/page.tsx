"use client"

import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { DashboardLayout } from "../../../components/dashboard-layout"
import { useAppSelector } from "../../../hooks/redux"
import { Search, Play, Clock, Eye, Filter, Plus } from "lucide-react"

export default function VideosPage() {
  const { language } = useAppSelector((state) => state.ui)

  const videos = [
    {
      id: 1,
      title: language === "en" ? "Introduction to Algebra" : "مقدمة في الجبر",
      description:
        language === "en" ? "Basic algebraic concepts and equations" : "المفاهيم الجبرية الأساسية والمعادلات",
      duration: "15:30",
      views: 1234,
      category: language === "en" ? "Mathematics" : "الرياضيات",
      thumbnail: "/algebra-lesson.png",
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      title: language === "en" ? "World History Overview" : "نظرة عامة على التاريخ العالمي",
      description:
        language === "en" ? "Major historical events and civilizations" : "الأحداث التاريخية الرئيسية والحضارات",
      duration: "22:45",
      views: 856,
      category: language === "en" ? "History" : "التاريخ",
      thumbnail: "/history-lesson.png",
      uploadDate: "2024-01-12",
    },
    {
      id: 3,
      title: language === "en" ? "Chemistry Basics" : "أساسيات الكيمياء",
      description: language === "en" ? "Fundamental chemistry principles" : "مبادئ الكيمياء الأساسية",
      duration: "18:20",
      views: 2156,
      category: language === "en" ? "Science" : "العلوم",
      thumbnail: "/chemistry-lesson.png",
      uploadDate: "2024-01-10",
    },
    {
      id: 4,
      title: language === "en" ? "English Literature" : "الأدب الإنجليزي",
      description: language === "en" ? "Classic literature analysis" : "تحليل الأدب الكلاسيكي",
      duration: "25:15",
      views: 743,
      category: language === "en" ? "Literature" : "الأدب",
      thumbnail: "/literature-lesson.png",
      uploadDate: "2024-01-08",
    },
    {
      id: 5,
      title: language === "en" ? "Physics Fundamentals" : "أساسيات الفيزياء",
      description: language === "en" ? "Basic physics concepts and laws" : "المفاهيم والقوانين الفيزيائية الأساسية",
      duration: "20:30",
      views: 1567,
      category: language === "en" ? "Physics" : "الفيزياء",
      thumbnail: "/physics-lesson.png",
      uploadDate: "2024-01-05",
    },
    {
      id: 6,
      title: language === "en" ? "Biology Essentials" : "أساسيات علم الأحياء",
      description: language === "en" ? "Cell structure and biological processes" : "بنية الخلية والعمليات البيولوجية",
      duration: "19:45",
      views: 1289,
      category: language === "en" ? "Biology" : "علم الأحياء",
      thumbnail: "/biology-lesson.png",
      uploadDate: "2024-01-03",
    },
  ]

  const categories = [...new Set(videos.map((video) => video.category))]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{language === "en" ? "Videos" : "الفيديوهات"}</h1>
            <p className="text-gray-600">
              {language === "en" ? "Educational videos and lessons" : "فيديوهات ودروس تعليمية"}
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {language === "en" ? "Upload Video" : "رفع فيديو"}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={language === "en" ? "Search videos..." : "البحث عن الفيديوهات..."}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {language === "en" ? "Filter" : "تصفية"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="cursor-pointer">
            {language === "en" ? "All" : "الكل"}
          </Badge>
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="cursor-pointer hover:bg-gray-100">
              {category}
            </Badge>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity rounded-t-lg">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {video.category}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {video.views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {video.duration}
                      </div>
                    </div>
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="bg-transparent">
            {language === "en" ? "Load More Videos" : "تحميل المزيد من الفيديوهات"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

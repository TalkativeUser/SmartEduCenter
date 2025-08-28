"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { DashboardLayout } from "../../../components/dashboard-layout"
import { useAppSelector } from "../../../hooks/redux"
import { Camera, Mail, Phone, MapPin, Calendar, Edit, Save } from "lucide-react"
import React from "react"

export default function ProfilePage() {
  const { user, language } = useAppSelector((state) => ({
    user: state.auth.user,
    language: state.ui.language,
  }))

  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    address: "123 Education St, Tech City, TC 12345",
    bio: "Passionate educator with 10+ years of experience in mathematics and science education.",
    department: "Mathematics",
    subjects: ["Algebra", "Geometry", "Calculus"],
  })

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false)
    console.log("Profile updated:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{language === "en" ? "Profile" : "الملف الشخصي"}</h1>
            <p className="text-gray-600">
              {language === "en" ? "Manage your personal information" : "إدارة معلوماتك الشخصية"}
            </p>
          </div>
          <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                {language === "en" ? "Save Changes" : "حفظ التغييرات"}
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                {language === "en" ? "Edit Profile" : "تعديل الملف الشخصي"}
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                      variant="secondary"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600 capitalize">{user?.role}</p>
                  <Badge variant="secondary" className="mt-2">
                    {formData.department}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-center">{formData.address}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{language === "en" ? "Joined January 2024" : "انضم في يناير 2024"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Personal Information" : "المعلومات الشخصية"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{language === "en" ? "Full Name" : "الاسم الكامل"}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{language === "en" ? "Phone Number" : "رقم الهاتف"}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">{language === "en" ? "Department" : "القسم"}</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">{language === "en" ? "Address" : "العنوان"}</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">{language === "en" ? "Bio" : "السيرة الذاتية"}</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Teaching Information */}
            {user?.role === "teacher" && (
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Teaching Information" : "معلومات التدريس"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>{language === "en" ? "Subjects" : "المواد"}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.subjects.map((subject, index) => (
                        <Badge key={index} variant="outline">
                          {subject}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                          + {language === "en" ? "Add Subject" : "إضافة مادة"}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{language === "en" ? "Years of Experience" : "سنوات الخبرة"}</Label>
                      <Input value="10+" disabled={!isEditing} className="mt-1" />
                    </div>
                    <div>
                      <Label>{language === "en" ? "Education Level" : "المستوى التعليمي"}</Label>
                      <Input value="Master's Degree" disabled={!isEditing} className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Statistics" : "الإحصائيات"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{user?.role === "teacher" ? "156" : "12"}</div>
                    <div className="text-sm text-gray-600">
                      {user?.role === "teacher"
                        ? language === "en"
                          ? "Students Taught"
                          : "الطلاب المدرسون"
                        : language === "en"
                          ? "Courses Completed"
                          : "الدورات المكتملة"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{user?.role === "teacher" ? "4.8" : "3.8"}</div>
                    <div className="text-sm text-gray-600">
                      {user?.role === "teacher"
                        ? language === "en"
                          ? "Average Rating"
                          : "التقييم المتوسط"
                        : language === "en"
                          ? "GPA"
                          : "المعدل التراكمي"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{user?.role === "teacher" ? "8" : "95%"}</div>
                    <div className="text-sm text-gray-600">
                      {user?.role === "teacher"
                        ? language === "en"
                          ? "Classes Teaching"
                          : "الفصول التي يدرسها"
                        : language === "en"
                          ? "Attendance Rate"
                          : "معدل الحضور"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

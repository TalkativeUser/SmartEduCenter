"use client"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { PublicLayout } from "../../components/public-layout"
import { useAppSelector } from "../../hooks/redux"
import { BookOpen, Users, BarChart3, Shield, Clock, Award } from "lucide-react"

export default function HomePage() {
  const { language } = useAppSelector((state) => state.ui)

  const features = [
    {
      icon: BookOpen,
      title: language === "en" ? "Smart Learning" : "التعلم الذكي",
      description: language === "en" ? "Interactive digital classrooms" : "فصول دراسية رقمية تفاعلية",
    },
    {
      icon: Users,
      title: language === "en" ? "Student Management" : "إدارة الطلاب",
      description: language === "en" ? "Complete student lifecycle tracking" : "تتبع دورة حياة الطالب الكاملة",
    },
    {
      icon: BarChart3,
      title: language === "en" ? "Analytics & Reports" : "التحليلات والتقارير",
      description:
        language === "en" ? "Data-driven insights for better decisions" : "رؤى مدفوعة بالبيانات لقرارات أفضل",
    },
    {
      icon: Shield,
      title: language === "en" ? "Secure & Safe" : "آمن ومحمي",
      description: language === "en" ? "Enterprise-grade security" : "أمان على مستوى المؤسسات",
    },
    {
      icon: Clock,
      title: language === "en" ? "24/7 Access" : "وصول على مدار الساعة",
      description: language === "en" ? "Learn anytime, anywhere" : "تعلم في أي وقت وأي مكان",
    },
    {
      icon: Award,
      title: language === "en" ? "Certified Quality" : "جودة معتمدة",
      description: language === "en" ? "International education standards" : "معايير التعليم الدولية",
    },
  ]

  return (
    <PublicLayout>


      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 " >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {language === "en" ? (
                <>
                  Create Your Own  <span className="text-blue-600">SmartClass Manager Platform</span>
                </>
              ) : (
                <>
                  أنشئ منصتك الذكية لإدارة 
                  <span className="text-blue-600 block ">الفصول الدراسية</span>
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {language === "en"
                ? "An intelligent system for tracking student attendance and absence, providing parents with the ability to view all their children's performance. Helps you manage payments securely. Enables you to send WhatsApp messages to parents for instant updates. Provides students with remote booking capability."
                : "نظام ذكي لتتبع حضور وغياب الطلاب، يوفر لأولياء الأمور إمكانية الإطلاع علي جميع أداء أبنائهم. ويساعدك في إدارة المدفوعات بشكل امن. يٌمكنك من إرسال رسائل واتساب لأولياء الأمور لتحديثهم بشكل فوري. يوفر للطالب إمكانية الحجز عن بعد"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 py-3">
                  {language === "en" ? "Get Started Free" : "ابدأ مجاناً"}
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  {language === "en" ? "Learn More" : "اعرف المزيد"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "en" ? "Why Choose School Smart?" : "لماذا تختار المدرسة الذكية؟"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Everything you need to run a modern, efficient educational institution."
                : "كل ما تحتاجه لإدارة مؤسسة تعليمية حديثة وفعالة."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === "en" ? "Ready to Get Started?" : "هل أنت مستعد للبدء؟"}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {language === "en"
              ? "Join thousands of schools already using our platform to enhance education."
              : "انضم إلى آلاف المدارس التي تستخدم منصتنا بالفعل لتعزيز التعليم."}
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              {language === "en" ? "Start Your Free Trial" : "ابدأ تجربتك المجانية"}
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}

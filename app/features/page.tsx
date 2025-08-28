"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { PublicLayout } from "../../components/public-layout"
import { useAppSelector } from "../../hooks/redux"
import {
  BookOpen,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Shield,
  Smartphone,
  Cloud,
  Zap,
  Award,
  Clock,
} from "lucide-react"

export default function FeaturesPage() {
  const { language } = useAppSelector((state) => state.ui)

  const features = [
    {
      icon: BookOpen,
      title: language === "en" ? "Digital Classroom" : "الفصل الرقمي",
      description:
        language === "en"
          ? "Interactive virtual classrooms with multimedia content, assignments, and real-time collaboration tools."
          : "فصول دراسية افتراضية تفاعلية مع محتوى متعدد الوسائط والواجبات وأدوات التعاون في الوقت الفعلي.",
      category: language === "en" ? "Learning" : "التعلم",
    },
    {
      icon: Users,
      title: language === "en" ? "Student Management" : "إدارة الطلاب",
      description:
        language === "en"
          ? "Comprehensive student profiles, enrollment tracking, attendance monitoring, and academic progress reports."
          : "ملفات شخصية شاملة للطلاب وتتبع التسجيل ومراقبة الحضور وتقارير التقدم الأكاديمي.",
      category: language === "en" ? "Management" : "الإدارة",
    },
    {
      icon: BarChart3,
      title: language === "en" ? "Analytics Dashboard" : "لوحة التحليلات",
      description:
        language === "en"
          ? "Data-driven insights with customizable reports, performance metrics, and predictive analytics."
          : "رؤى مدفوعة بالبيانات مع تقارير قابلة للتخصيص ومقاييس الأداء والتحليلات التنبؤية.",
      category: language === "en" ? "Analytics" : "التحليلات",
    },
    {
      icon: Calendar,
      title: language === "en" ? "Schedule Management" : "إدارة الجدولة",
      description:
        language === "en"
          ? "Automated timetable generation, class scheduling, exam planning, and event management."
          : "إنشاء الجدول الزمني التلقائي وجدولة الفصول وتخطيط الامتحانات وإدارة الأحداث.",
      category: language === "en" ? "Organization" : "التنظيم",
    },
    {
      icon: MessageSquare,
      title: language === "en" ? "Communication Hub" : "مركز التواصل",
      description:
        language === "en"
          ? "Integrated messaging system for teachers, students, and parents with announcements and notifications."
          : "نظام رسائل متكامل للمعلمين والطلاب وأولياء الأمور مع الإعلانات والإشعارات.",
      category: language === "en" ? "Communication" : "التواصل",
    },
    {
      icon: FileText,
      title: language === "en" ? "Grade Management" : "إدارة الدرجات",
      description:
        language === "en"
          ? "Digital gradebook with automated calculations, progress tracking, and parent portal access."
          : "دفتر درجات رقمي مع حسابات تلقائية وتتبع التقدم ووصول بوابة أولياء الأمور.",
      category: language === "en" ? "Assessment" : "التقييم",
    },
    {
      icon: Shield,
      title: language === "en" ? "Security & Privacy" : "الأمان والخصوصية",
      description:
        language === "en"
          ? "Enterprise-grade security with role-based access control, data encryption, and compliance standards."
          : "أمان على مستوى المؤسسات مع التحكم في الوصول القائم على الأدوار وتشفير البيانات ومعايير الامتثال.",
      category: language === "en" ? "Security" : "الأمان",
    },
    {
      icon: Smartphone,
      title: language === "en" ? "Mobile Access" : "الوصول المحمول",
      description:
        language === "en"
          ? "Native mobile apps for iOS and Android with offline capabilities and push notifications."
          : "تطبيقات محمولة أصلية لنظامي iOS و Android مع إمكانيات غير متصلة بالإنترنت وإشعارات فورية.",
      category: language === "en" ? "Accessibility" : "إمكانية الوصول",
    },
    {
      icon: Cloud,
      title: language === "en" ? "Cloud Infrastructure" : "البنية التحتية السحابية",
      description:
        language === "en"
          ? "Scalable cloud hosting with automatic backups, 99.9% uptime, and global content delivery."
          : "استضافة سحابية قابلة للتوسع مع نسخ احتياطية تلقائية ووقت تشغيل 99.9% وتسليم محتوى عالمي.",
      category: language === "en" ? "Infrastructure" : "البنية التحتية",
    },
    {
      icon: Zap,
      title: language === "en" ? "API Integration" : "تكامل API",
      description:
        language === "en"
          ? "RESTful APIs for seamless integration with existing systems and third-party educational tools."
          : "واجهات برمجة تطبيقات RESTful للتكامل السلس مع الأنظمة الحالية وأدوات التعليم من طرف ثالث.",
      category: language === "en" ? "Integration" : "التكامل",
    },
    {
      icon: Award,
      title: language === "en" ? "Certification Tracking" : "تتبع الشهادات",
      description:
        language === "en"
          ? "Digital certificates, achievement badges, and compliance tracking for educational standards."
          : "شهادات رقمية وشارات الإنجاز وتتبع الامتثال للمعايير التعليمية.",
      category: language === "en" ? "Certification" : "الشهادات",
    },
    {
      icon: Clock,
      title: language === "en" ? "24/7 Support" : "دعم على مدار الساعة",
      description:
        language === "en"
          ? "Round-the-clock technical support with dedicated account managers and training resources."
          : "دعم فني على مدار الساعة مع مديري حسابات مخصصين وموارد التدريب.",
      category: language === "en" ? "Support" : "الدعم",
    },
  ]

  const categories = [...new Set(features.map((feature) => feature.category))]

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "en" ? "Powerful Features for Modern Education" : "ميزات قوية للتعليم الحديث"}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {language === "en"
              ? "Discover comprehensive tools designed to streamline school operations, enhance learning experiences, and drive educational success."
              : "اكتشف الأدوات الشاملة المصممة لتبسيط عمليات المدرسة وتعزيز تجارب التعلم ودفع النجاح التعليمي."}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <span className="text-sm text-blue-600 font-medium">{feature.category}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {language === "en" ? "Ready to Transform Your School?" : "هل أنت مستعد لتحويل مدرستك؟"}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {language === "en"
              ? "Join thousands of educational institutions already benefiting from our comprehensive platform."
              : "انضم إلى آلاف المؤسسات التعليمية التي تستفيد بالفعل من منصتنا الشاملة."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {language === "en" ? "Start Free Trial" : "ابدأ التجربة المجانية"}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              {language === "en" ? "Schedule Demo" : "جدولة عرض توضيحي"}
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

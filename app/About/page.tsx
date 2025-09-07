"use client"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { PublicLayout } from "../../components/public-layout"
import { useAppSelector } from "../../hooks/redux"
import { Check, X } from "lucide-react"

export default function PlansPage() {
  const { language } = useAppSelector((state) => state.ui)

  const plans = [
    {
      name: language === "en" ? "Free" : "مجاني",
      price: language === "en" ? "Free" : "مجاني",
      period: language === "en" ? "Forever" : "إلى الأبد",
      description: language === "en" ? "Perfect for small schools getting started" : "مثالي للمدارس الصغيرة التي تبدأ",
      features: [
        { name: language === "en" ? "Up to 100 students" : "حتى 100 طالب", included: true },
        { name: language === "en" ? "5 teachers" : "5 معلمين", included: true },
        { name: language === "en" ? "Basic gradebook" : "دفتر درجات أساسي", included: true },
        { name: language === "en" ? "Student profiles" : "ملفات الطلاب", included: true },
        { name: language === "en" ? "Email support" : "دعم البريد الإلكتروني", included: true },
        { name: language === "en" ? "Advanced analytics" : "تحليلات متقدمة", included: false },
        { name: language === "en" ? "API access" : "وصول API", included: false },
        { name: language === "en" ? "Custom branding" : "علامة تجارية مخصصة", included: false },
        { name: language === "en" ? "Priority support" : "دعم أولوية", included: false },
      ],
      popular: false,
      buttonText: language === "en" ? "Get Started" : "ابدأ",
      buttonVariant: "outline" as const,
    },
    {
      name: language === "en" ? "Starter" : "المبتدئ",
      price: "$29",
      period: language === "en" ? "per month" : "شهرياً",
      description:
        language === "en"
          ? "Ideal for growing schools with advanced needs"
          : "مثالي للمدارس النامية ذات الاحتياجات المتقدمة",
      features: [
        { name: language === "en" ? "Up to 500 students" : "حتى 500 طالب", included: true },
        { name: language === "en" ? "25 teachers" : "25 معلم", included: true },
        { name: language === "en" ? "Advanced gradebook" : "دفتر درجات متقدم", included: true },
        { name: language === "en" ? "Parent portal" : "بوابة أولياء الأمور", included: true },
        { name: language === "en" ? "Basic analytics" : "تحليلات أساسية", included: true },
        { name: language === "en" ? "Mobile app access" : "وصول التطبيق المحمول", included: true },
        { name: language === "en" ? "API access" : "وصول API", included: false },
        { name: language === "en" ? "Custom branding" : "علامة تجارية مخصصة", included: false },
        { name: language === "en" ? "Priority support" : "دعم أولوية", included: false },
      ],
      popular: true,
      buttonText: language === "en" ? "Start Free Trial" : "ابدأ التجربة المجانية",
      buttonVariant: "default" as const,
    },
    {
      name: language === "en" ? "Premium" : "المتميز",
      price: "$99",
      period: language === "en" ? "per month" : "شهرياً",
      description:
        language === "en"
          ? "Complete solution for large educational institutions"
          : "حل كامل للمؤسسات التعليمية الكبيرة",
      features: [
        { name: language === "en" ? "Unlimited students" : "طلاب غير محدودين", included: true },
        { name: language === "en" ? "Unlimited teachers" : "معلمين غير محدودين", included: true },
        { name: language === "en" ? "Full feature access" : "وصول كامل للميزات", included: true },
        { name: language === "en" ? "Advanced analytics" : "تحليلات متقدمة", included: true },
        { name: language === "en" ? "API access" : "وصول API", included: true },
        { name: language === "en" ? "Custom branding" : "علامة تجارية مخصصة", included: true },
        { name: language === "en" ? "Priority support" : "دعم أولوية", included: true },
        { name: language === "en" ? "Dedicated account manager" : "مدير حساب مخصص", included: true },
        { name: language === "en" ? "Custom integrations" : "تكاملات مخصصة", included: true },
      ],
      popular: false,
      buttonText: language === "en" ? "Contact Sales" : "اتصل بالمبيعات",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "en" ? "Choose Your Perfect Plan" : "اختر خطتك المثالية"}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {language === "en"
              ? "Flexible pricing options designed to grow with your educational institution. Start free and upgrade as you expand."
              : "خيارات تسعير مرنة مصممة لتنمو مع مؤسستك التعليمية. ابدأ مجاناً وقم بالترقية عند التوسع."}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {language === "en" ? "Most Popular" : "الأكثر شعبية"}
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== (language === "en" ? "Free" : "مجاني") && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-900" : "text-gray-400"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.buttonVariant} className="w-full" size="lg">
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "en" ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
            </h2>
            <p className="text-xl text-gray-600">
              {language === "en" ? "Everything you need to know about our pricing" : "كل ما تحتاج لمعرفته حول أسعارنا"}
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === "en" ? "Can I change plans anytime?" : "هل يمكنني تغيير الخطط في أي وقت؟"}
              </h3>
              <p className="text-gray-600">
                {language === "en"
                  ? "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                  : "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. ستنعكس التغييرات في دورة الفوترة التالية."}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === "en" ? "Is there a setup fee?" : "هل هناك رسوم إعداد؟"}
              </h3>
              <p className="text-gray-600">
                {language === "en"
                  ? "No, there are no setup fees for any of our plans. You only pay the monthly subscription fee."
                  : "لا، لا توجد رسوم إعداد لأي من خططنا. تدفع فقط رسوم الاشتراك الشهري."}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === "en" ? "What payment methods do you accept?" : "ما طرق الدفع التي تقبلونها؟"}
              </h3>
              <p className="text-gray-600">
                {language === "en"
                  ? "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions."
                  : "نقبل جميع بطاقات الائتمان الرئيسية و PayPal والتحويلات المصرفية للاشتراكات السنوية."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

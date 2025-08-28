"use client"

import React from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { PublicLayout } from "../../components/public-layout"
import { useAppSelector } from "../../hooks/redux"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const { language } = useAppSelector((state) => state.ui)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    alert(language === "en" ? "Message sent successfully!" : "تم إرسال الرسالة بنجاح!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: language === "en" ? "Email" : "البريد الإلكتروني",
      content: "support@schoolsmart.com",
      description: language === "en" ? "Send us an email anytime" : "أرسل لنا بريداً إلكترونياً في أي وقت",
    },
    {
      icon: Phone,
      title: language === "en" ? "Phone" : "الهاتف",
      content: "+1 (555) 123-4567",
      description: language === "en" ? "Mon-Fri from 8am to 6pm" : "الاثنين-الجمعة من 8 صباحاً إلى 6 مساءً",
    },
    {
      icon: MapPin,
      title: language === "en" ? "Office" : "المكتب",
      content:
        language === "en" ? "123 Education St, Tech City, TC 12345" : "123 شارع التعليم، مدينة التقنية، TC 12345",
      description: language === "en" ? "Visit our headquarters" : "زر مقرنا الرئيسي",
    },
    {
      icon: Clock,
      title: language === "en" ? "Support Hours" : "ساعات الدعم",
      content: language === "en" ? "24/7 Online Support" : "دعم عبر الإنترنت على مدار الساعة",
      description: language === "en" ? "We're here to help anytime" : "نحن هنا للمساعدة في أي وقت",
    },
  ]

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "en" ? "Get in Touch" : "تواصل معنا"}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {language === "en"
              ? "Have questions about School Smart? We're here to help you transform your educational institution."
              : "لديك أسئلة حول المدرسة الذكية؟ نحن هنا لمساعدتك في تحويل مؤسستك التعليمية."}
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {language === "en" ? "Send us a Message" : "أرسل لنا رسالة"}
                  </CardTitle>
                  <p className="text-gray-600">
                    {language === "en"
                      ? "Fill out the form below and we'll get back to you within 24 hours."
                      : "املأ النموذج أدناه وسنعاود الاتصال بك خلال 24 ساعة."}
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "en" ? "Full Name" : "الاسم الكامل"}
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={language === "en" ? "Enter your full name" : "أدخل اسمك الكامل"}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"}
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={language === "en" ? "Enter your email address" : "أدخل عنوان بريدك الإلكتروني"}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "en" ? "Message" : "الرسالة"}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={
                          language === "en"
                            ? "Tell us about your school and how we can help..."
                            : "أخبرنا عن مدرستك وكيف يمكننا المساعدة..."
                        }
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      {language === "en" ? "Send Message" : "إرسال الرسالة"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === "en" ? "Contact Information" : "معلومات الاتصال"}
                </h2>
                <p className="text-gray-600 mb-8">
                  {language === "en"
                    ? "Reach out to us through any of these channels. Our team is ready to assist you with your educational technology needs."
                    : "تواصل معنا من خلال أي من هذه القنوات. فريقنا مستعد لمساعدتك في احتياجات التكنولوجيا التعليمية."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                          <p className="text-gray-900 font-medium mb-1">{info.content}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {language === "en" ? "Need Immediate Help?" : "تحتاج مساعدة فورية؟"}
                  </h3>
                  <p className="text-blue-800 mb-4">
                    {language === "en"
                      ? "For urgent technical issues or account problems, please use our priority support channel."
                      : "للمشاكل التقنية العاجلة أو مشاكل الحساب، يرجى استخدام قناة الدعم ذات الأولوية."}
                  </p>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                    {language === "en" ? "Priority Support" : "الدعم ذو الأولوية"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

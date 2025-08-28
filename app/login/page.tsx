"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { PublicLayout } from "../../components/public-layout"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { loginStart, loginSuccess, loginFailure, clearError } from "../../store/slices/authSlice"
import { mockLogin } from "../../utils/auth"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, error, isAuthenticated, language } = useAppSelector((state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    language: state.ui.language,
  }))

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = React.useState(false)

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginStart())

    try {
      const user = await mockLogin(formData.email, formData.password)
      dispatch(loginSuccess(user))
      router.push("/dashboard")
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : "Login failed"))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === "en" ? "Sign in to your account" : "تسجيل الدخول إلى حسابك"}
            </h2>
            <p className="mt-2 text-gray-600">
              {language === "en" ? "Welcome back! Please enter your details." : "مرحباً بعودتك! يرجى إدخال بياناتك."}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">{language === "en" ? "Login" : "تسجيل الدخول"}</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">{language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={language === "en" ? "Enter your email address" : "أدخل عنوان بريدك الإلكتروني"}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">{language === "en" ? "Password" : "كلمة المرور"}</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={language === "en" ? "Enter your password" : "أدخل كلمة المرور"}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      {language === "en" ? "Forgot your password?" : "نسيت كلمة المرور؟"}
                    </a>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === "en" ? "Signing in..." : "جاري تسجيل الدخول..."}
                    </>
                  ) : (
                    <>{language === "en" ? "Sign in" : "تسجيل الدخول"}</>
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      {language === "en" ? "Don't have an account?" : "ليس لديك حساب؟"}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/register">
                    <Button variant="outline" className="w-full bg-transparent">
                      {language === "en" ? "Create new account" : "إنشاء حساب جديد"}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  {language === "en" ? "Demo Credentials:" : "بيانات التجربة:"}
                </h4>
                <div className="text-xs text-blue-800 space-y-1">
                  <p>
                    <strong>{language === "en" ? "Teacher:" : "معلم:"}</strong> teacher@school.com / password
                  </p>
                  <p>
                    <strong>{language === "en" ? "Student:" : "طالب:"}</strong> student@school.com / password
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}

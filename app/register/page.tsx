"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Checkbox } from "../../components/ui/checkbox"
import { PublicLayout } from "../../components/public-layout"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { loginStart, loginSuccess, loginFailure, clearError } from "../../store/slices/authSlice"
import { mockRegister } from "../../utils/auth"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, error, isAuthenticated, language } = useAppSelector((state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    language: state.ui.language,
  }))

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as "teacher" | "student" | "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [validationErrors, setValidationErrors] = React.useState<string[]>([])

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

  const validateForm = () => {
    const errors: string[] = []

    if (formData.name.length < 2) {
      errors.push(language === "en" ? "Name must be at least 2 characters" : "يجب أن يكون الاسم على الأقل حرفين")
    }

    if (formData.password.length < 6) {
      errors.push(
        language === "en" ? "Password must be at least 6 characters" : "يجب أن تكون كلمة المرور على الأقل 6 أحرف",
      )
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push(language === "en" ? "Passwords do not match" : "كلمات المرور غير متطابقة")
    }

    if (!formData.role) {
      errors.push(language === "en" ? "Please select your role" : "يرجى اختيار دورك")
    }

    if (!formData.agreeToTerms) {
      errors.push(language === "en" ? "You must agree to the terms and conditions" : "يجب أن توافق على الشروط والأحكام")
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    dispatch(loginStart())

    try {
      const user = await mockRegister(formData.name, formData.email, formData.password, formData.role)
      dispatch(loginSuccess(user))
      router.push("/dashboard")
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : "Registration failed"))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value as "teacher" | "student",
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeToTerms: checked,
    })
  }

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === "en" ? "Create your account" : "إنشاء حسابك"}
            </h2>
            <p className="mt-2 text-gray-600">
              {language === "en" ? "Join thousands of educators and students" : "انضم إلى آلاف المعلمين والطلاب"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">{language === "en" ? "Register" : "التسجيل"}</CardTitle>
            </CardHeader>
            <CardContent>
              {(error || validationErrors.length > 0) && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error && <div>{error}</div>}
                    {validationErrors.map((err, index) => (
                      <div key={index}>{err}</div>
                    ))}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{language === "en" ? "Full Name" : "الاسم الكامل"}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={language === "en" ? "Enter your full name" : "أدخل اسمك الكامل"}
                    className="mt-1"
                  />
                </div>

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
                  <Label htmlFor="role">{language === "en" ? "Role" : "الدور"}</Label>
                  <Select onValueChange={handleRoleChange} value={formData.role}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={language === "en" ? "Select your role" : "اختر دورك"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">{language === "en" ? "Teacher" : "معلم"}</SelectItem>
                      <SelectItem value="student">{language === "en" ? "Student" : "طالب"}</SelectItem>
                    </SelectContent>
                  </Select>
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
                      placeholder={language === "en" ? "Create a password" : "إنشاء كلمة مرور"}
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

                <div>
                  <Label htmlFor="confirmPassword">
                    {language === "en" ? "Confirm Password" : "تأكيد كلمة المرور"}
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder={language === "en" ? "Confirm your password" : "أكد كلمة المرور"}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="agreeToTerms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    {language === "en" ? (
                      <>
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-500">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-500">
                          Privacy Policy
                        </a>
                      </>
                    ) : (
                      <>
                        أوافق على{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-500">
                          الشروط والأحكام
                        </a>{" "}
                        و{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-500">
                          سياسة الخصوصية
                        </a>
                      </>
                    )}
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === "en" ? "Creating account..." : "جاري إنشاء الحساب..."}
                    </>
                  ) : (
                    <>{language === "en" ? "Create account" : "إنشاء حساب"}</>
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
                      {language === "en" ? "Already have an account?" : "لديك حساب بالفعل؟"}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      {language === "en" ? "Sign in instead" : "تسجيل الدخول بدلاً من ذلك"}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}

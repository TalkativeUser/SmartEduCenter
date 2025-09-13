
"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { PublicLayout } from "../../components/public-layout"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { clearError } from "../../store/slices/authSlice"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { registerTeacher } from "@/lib/api/auth"
import { Teacher } from "@/types"

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { error, isAuthenticated, language } = useAppSelector((state) => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    language: state.ui.language,
  }))

  const formRef = useRef<HTMLFormElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [gender, setGender] = useState<"male" | "female" | "">("")
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  
 if(true) {
  router.push("/login")
  return
 }

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  const validateForm = (data: Record<string, any>) => {
    const errors: string[] = []

    if (!data.name || data.name.length < 2) {
      errors.push(language === "en" ? "Name must be at least 2 characters" : "يجب أن يكون الاسم على الأقل حرفين")
    }

    if (!data.phone || data.phone.length < 10) {
      errors.push(language === "en" ? "Please enter a valid phone number" : "يرجى إدخال رقم هاتف صحيح")
    }

    if (!data.gender) {
      errors.push(language === "en" ? "Please select your gender" : "يرجى اختيار جنسك")
    }

    if (!data.password || data.password.length < 6) {
      errors.push(
        language === "en" ? "Password must be at least 6 characters" : "يجب أن تكون كلمة المرور على الأقل 6 أحرف",
      )
    }

    if (data.password !== data.confirmPassword) {
      errors.push(language === "en" ? "Passwords do not match" : "كلمات المرور غير متطابقة")
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries()) as Teacher

    // نضيف الجندر لأنه جاي من Select مش من input
    data.gender = gender

    if (!validateForm(data)) {
      return
    }

    console.log("Form Data:", data)
    
    try {
      setLoading(true)
      const result = await dispatch(registerTeacher(data))
      
      // Check if registration was successful
      if (result && result.success) {
        // Show success message
        setSuccessMessage(
          language === "en" 
            ? "Account created successfully! Redirecting to login..." 
            : "تم إنشاء الحساب بنجاح! جاري التوجيه لصفحة تسجيل الدخول..."
        )
        
        // Clear any validation errors
        setValidationErrors([])
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setLoading(false)
    }
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
              {successMessage && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {successMessage}
                  </AlertDescription>
                </Alert>
              )}

              {(error || validationErrors.length > 0) && !successMessage && (
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

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{language === "en" ? "Full Name" : "الاسم الكامل"}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
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
                    placeholder={language === "en" ? "Enter your email address" : "أدخل عنوان بريدك الإلكتروني"}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{language === "en" ? "Phone Number" : "رقم الهاتف"}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder={language === "en" ? "Enter your phone number" : "أدخل رقم هاتفك"}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">{language === "en" ? "Gender" : "الجنس"}</Label>
                  <Select onValueChange={(value) => setGender(value as "male" | "female")} value={gender}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={language === "en" ? "Select your gender" : "اختر جنسك"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{language === "en" ? "Male" : "ذكر"}</SelectItem>
                      <SelectItem value="female">{language === "en" ? "Female" : "أنثى"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">{language === "en" ? "Profile Image URL" : "رابط صورة الملف الشخصي"}</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder={language === "en" ? "Enter profile image URL" : "أدخل رابط صورة الملف الشخصي"}
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

                <Button type="submit" className="w-full" size="lg">
                  {loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     
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

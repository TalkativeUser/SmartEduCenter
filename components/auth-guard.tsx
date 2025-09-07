"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { checkTeacherToken } from "../store/slices/authSlice"
import Loading from "./ui/Loading"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthGuard({ children, requireAuth, redirectTo }: AuthGuardProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)
  const [isInitializing, setIsInitializing] = useState(true)

  // Check for teacher token on component mount
  useEffect(() => {
    dispatch(checkTeacherToken())
  }, [dispatch])

  useEffect(() => {
    if (!loading) {
      setIsInitializing(false)
      if (requireAuth && !isAuthenticated) {
        // المستخدم محتاج يكون داخل لكن مش مسجل دخول
        router.replace(redirectTo || "/login")
      } else if (!requireAuth && isAuthenticated) {
        // صفحة عامة (زي login/register) لكن المستخدم داخل بالفعل
        router.replace(redirectTo || "/dashboard")
      }
    }
  }, [isAuthenticated, loading, requireAuth, redirectTo, router])


  // Show loading spinner while checking authentication or initializing
  if (loading || isInitializing) {
    return (
      <Loading/>
    )
  }

  // Don't render children if redirect is needed
  if (requireAuth && !isAuthenticated) {
    return (
      <Loading/>
    )
  }

  if (!requireAuth && isAuthenticated) {
    return (
        <Loading/>
    )
  }
  

  return <>{children}</>
}

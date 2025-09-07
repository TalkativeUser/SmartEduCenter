"use client"

import type React from "react"

import {AuthGuard} from "../../components/auth-guard"


export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return <AuthGuard requireAuth={false} redirectTo="/dashboard" >{children}</AuthGuard>
}

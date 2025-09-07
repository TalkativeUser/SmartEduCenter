// src/components/ui/LogoutTimer.tsx
"use client"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { clearSession } from "@/store/slices/sessionSlice"
import { logout as authLogout } from "@/store/slices/authSlice" // افترض عندك action اسمها logout
import { Clock } from "lucide-react"

export default function LogoutTimer() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const expiryTime = useAppSelector((s) => s.session.expiryTime)
  const [remainingSec, setRemainingSec] = useState<number>(() => {
    if (!expiryTime) return 0
    const diff = Math.max(0, Math.ceil((expiryTime - Date.now()) / 1000))
    return diff
  })

  const intervalRef = useRef<number | null>(null)

  // init & react to expiryTime changes
  useEffect(() => {
    // clear old interval
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (!expiryTime) {
      setRemainingSec(0)
      return
    }

    const update = () => {
      const diffMs = expiryTime - Date.now()
      const sec = Math.max(0, Math.ceil(diffMs / 1000))
      setRemainingSec(sec)
      if (sec <= 0) {
        // auto logout
        // 1) clear session state
        dispatch(clearSession())
        // 2) call your auth logout to remove token / session server-side if any
        dispatch(authLogout())
        // 3) navigate to login
        router.replace("/login")
      }
    }

    update()
    intervalRef.current = window.setInterval(update, 1000)

    return () => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [expiryTime, dispatch, router])

  // formatted time memoized
  const formatted = useMemo(() => {
    const min = Math.floor(remainingSec / 60)
    const sec = remainingSec % 60
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }, [remainingSec])

  // color logic memoized
  const styleClass = useMemo(() => {
    if (remainingSec <= 5 * 60 && remainingSec > 0) return "text-red-600 animate-pulse"
    if (remainingSec <= 10 * 60 && remainingSec > 0) return "text-yellow-600"
    if (remainingSec > 10 * 60) return "text-green-600"
    return "text-gray-500"
  }, [remainingSec])

  return (
    <div className={`flex items-center gap-2 font-mono ${styleClass}`}>
      <Clock className="w-5 h-5" />
      <span>{formatted}</span>
    </div>
  )
}

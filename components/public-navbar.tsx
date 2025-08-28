"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { Globe, Menu, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { toggleLanguage } from "../store/slices/uiSlice"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "../lib/utils"

const navigation = [
  { name: "Home", href: "/home", nameAr: "الرئيسية" },
  { name: "Features", href: "/features", nameAr: "المميزات" },
  { name: "Plans", href: "/plans", nameAr: "الخطط" },
  { name: "Contact", href: "/contact", nameAr: "اتصل بنا" },
]

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { language } = useAppSelector((state) => state.ui)

  const handleLanguageToggle = () => {
    dispatch(toggleLanguage())
  }

  const isRTL = language === "ar"

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/home" className="flex items-center space-x-2 hover-lift">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center animate-glow">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="font-bold text-xl text-foreground gradient-text">
                {language === "en" ? "School Smart" : "المدرسة الذكية"}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 animate-fade-in",
                  pathname === item.href ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-muted-foreground",
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {language === "en" ? item.name : item.nameAr}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="flex items-center space-x-1 hover-lift"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover-lift">
                {language === "en" ? "Login" : "تسجيل الدخول"}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="hover-lift animate-glow">
                {language === "en" ? "Register" : "التسجيل"}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="hover-lift">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur animate-slide-in-right">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-all duration-300 animate-fade-in",
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-950"
                      : "text-muted-foreground hover:text-blue-600 hover:bg-accent",
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === "en" ? item.name : item.nameAr}
                </Link>
              ))}
              <div className="border-t pt-3 mt-3 space-y-2">
                <div className="px-3">
                  <ThemeToggle />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLanguageToggle}
                  className="w-full justify-start hover-lift"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === "en" ? "العربية" : "English"}
                </Button>
                <Link href="/login" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start hover-lift">
                    {language === "en" ? "Login" : "تسجيل الدخول"}
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button size="sm" className="w-full hover-lift">
                    {language === "en" ? "Register" : "التسجيل"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

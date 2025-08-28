"use client"

import type React from "react"

import { PublicNavbar } from "./public-navbar"
import { useAppSelector } from "../hooks/redux"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const { language } = useAppSelector((state) => state.ui)
  const isRTL = language === "ar"

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SS</span>
                </div>
                <span className="font-bold text-xl text-gray-900">
                  {language === "en" ? "School Smart" : "المدرسة الذكية"}
                </span>
              </div>
              <p className="text-gray-600 text-sm max-w-md">
                {language === "en"
                  ? "Empowering education through smart technology solutions for modern schools."
                  : "تمكين التعليم من خلال حلول التكنولوجيا الذكية للمدارس الحديثة."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{language === "en" ? "Quick Links" : "روابط سريعة"}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
             
                <li>
                  <a href="/features" className="hover:text-blue-600 transition-colors">
                    {language === "en" ? "Features" : "المميزات"}
                  </a>
                </li>
                <li>
                  <a href="/plans" className="hover:text-blue-600 transition-colors">
                    {language === "en" ? "Pricing" : "الأسعار"}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{language === "en" ? "Support" : "الدعم"}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/contact" className="hover:text-blue-600 transition-colors">
                    {language === "en" ? "Contact Us" : "اتصل بنا"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {language === "en" ? "Help Center" : "مركز المساعدة"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {language === "en" ? "Documentation" : "التوثيق"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>
              {language === "en"
                ? "© 2024 School Smart System. All rights reserved."
                : "© 2024 نظام المدرسة الذكية. جميع الحقوق محفوظة."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

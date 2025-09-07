"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { toggleDrawer, toggleLanguage } from "../store/slices/uiSlice"
import { logout } from "../store/slices/authSlice"
import { ThemeToggle } from "./theme-toggle"
import {
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  BarChart3,
  Calendar,
  Settings,
  Bell,
  Globe,
  LogOut,
  ChevronDown,
  GraduationCap,
  MessageSquare,
  Video,
  User,
} from "lucide-react"
import { cn } from "../lib/utils"
import LogoutTimer from "./ui/LogoutTimer"
import { clearSession, loadSessionFromStorage } from "@/store/slices/sessionSlice"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useAppDispatch()
  const { drawerOpen, language } = useAppSelector((state) => state.ui)
  const isRTL = language === "ar"

  useEffect(() => {
    dispatch(loadSessionFromStorage())
  }, [dispatch])



  return (
    <div
      className={`min-h-screen bg-background transition-colors duration-300 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col transition-all duration-500 ease-in-out animate-slide-in-left",
          isRTL ? "right-0" : "left-0",
          drawerOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full",
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6 pb-4 shadow-xl border-r">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center space-x-2 hover-lift">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center animate-glow">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="font-bold text-xl text-foreground gradient-text">
                {language === "en" ? "School Smart" : "المدرسة الذكية"}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => dispatch(toggleDrawer())} className="md:hidden hover-lift">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile , at the top of the sidebar */}
          
             <UserProfile/>
          {/* Navigation , links of the sidebar or drawer */}
          <NavigationDrawer/>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("transition-all duration-500", drawerOpen ? (isRTL ? "mr-72" : "ml-72") : "ml-0")}>
        {/* Top bar */}
      
          <TopBar />

        {/* Page content , children of dashboard layout as studentsPage or classesPage etc */}
        <main className="py-6 animate-fade-in">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      {/* Mobile backdrop , when drawer is open in mobile mode , simple screen with alpha background */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => dispatch(toggleDrawer())}
        />
      )}
    </div>
  )
}









































//  sperated components 
const TopBar=()=>{

  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()


  return  <>
  
  <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-colors duration-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleDrawer())}
            className="-m-2.5 p-2.5 text-muted-foreground lg:hidden hover-lift cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="h-6 w-px bg-border lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />

              <LogoutTimer />


              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative hover-lift cursor-pointer">
                <Bell className="h-5 w-5" />
              
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs animate-bounce-in">
                    {3}
                  </Badge>
              
              </Button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" />

              {/* Profile dropdown */}
              <div className="flex items-center space-x-2 hover-lift">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden lg:block text-sm font-medium text-foreground">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>

  </>
}

const NavigationDrawer=()=>{
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { language } = useAppSelector((state) => state.ui)


  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]))
  }

  const handleLogout = () => {

  // clear session expiry
  dispatch(clearSession()) // يمسح expiryTime و localStorage


    dispatch(logout())
  }


  const navigation = [
    {
      name: language === "en" ? "Dashboard" : "لوحة التحكم",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: language === "en" ? "Students" : "الطلاب",
      href: "/dashboard/students",
      icon: Users,
      children: [
        { name: language === "en" ? "All Students" : "جميع الطلاب", href: "/dashboard/students" },
        { name: language === "en" ? "Add Student" : "إضافة طالب", href: "/dashboard/students/add" },
        { name: language === "en" ? "Student Reports" : "تقارير الطلاب", href: "/dashboard/students/reports" },
      ],
    },
    {
      name: language === "en" ? "ClasseRooms" : "الفصول الدراسيه",
      href: "/dashboard/classes",
      icon: BookOpen,
    },
    {
      name: language === "en" ? "Grades" : "الدرجات",
      href: "/dashboard/grades",
      icon: GraduationCap,
    },
    {
      name: language === "en" ? "Reports" : "التقارير",
      href: "/dashboard/reports",
      icon: BarChart3,
      children: [
        { name: language === "en" ? "Academic Reports" : "التقارير الأكاديمية", href: "/dashboard/reports/academic" },
        { name: language === "en" ? "Attendance Reports" : "تقارير الحضور", href: "/dashboard/reports/attendance" },
        { name: language === "en" ? "Performance Analytics" : "تحليلات الأداء", href: "/dashboard/reports/performance" },
      ],
    },
    {
      name: language === "en" ? "Schedule" : "الجدولة",
      href: "/dashboard/schedule",
      icon: Calendar,
    },
    {
      name: language === "en" ? "Messages" : "الرسائل",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      name: language === "en" ? "Videos" : "الفيديوهات",
      href: "/dashboard/videos",
      icon: Video,
    },
    {
      name: language === "en" ? "Profile" : "الملف الشخصي",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: language === "en" ? "Settings" : "الإعدادات",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]
  return <>
  
  <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item, index) => (
                    <li key={item.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => toggleExpanded(item.href)}
                            className={cn(
                              "group flex w-full items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-300 hover-lift cursor-pointer",
                              pathname.startsWith(item.href)
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-primary hover:bg-accent",
                            )}
                          >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {item.name}
                            <ChevronDown
                              className={cn(
                                "ml-auto h-4 w-4 transition-transform duration-300",
                                expandedItems.includes(item.href) ? "rotate-180" : "",
                              )}
                            />
                          </button>
                          {expandedItems.includes(item.href) && (
                            <ul className="mt-1 px-2 animate-slide-in-right">
                              {item.children.map((child, childIndex) => (
                                <li
                                  key={child.name}
                                  className="animate-fade-in"
                                  style={{ animationDelay: `${childIndex * 0.05}s` }}
                                >
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      "group flex gap-x-3 rounded-md py-2 pl-8 pr-2 text-sm leading-6 transition-all duration-300 hover-lift",
                                      pathname === child.href
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-muted-foreground hover:text-primary hover:bg-accent",
                                    )}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-300 hover-lift",
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-primary hover:bg-accent",
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="space-y-1">
                  <div className="flex justify-center mb-2">
                    <ThemeToggle />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(toggleLanguage())}
                    className="w-full justify-start hover-lift"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {language === "en" ? "العربية" : "English"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 hover-lift"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {language === "en" ? "Logout" : "تسجيل الخروج"}
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
  </>
}

const UserProfile=()=>{
  const { user } = useAppSelector((state) => state.auth)
  const {  language } = useAppSelector((state) => state.ui)

  return <>
  
  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg hover-lift animate-fade-in">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Badge variant="secondary" className="text-xs animate-bounce-in">
              {user?.role === "teacher"
                ? language === "en"
                  ? "Teacher"
                  : "معلم"
                : language === "en"
                  ? "Student"
                  : "طالب"}
            </Badge>
          </div>
  </>
}
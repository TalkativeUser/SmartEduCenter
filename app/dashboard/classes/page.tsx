"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { DashboardLayout } from "../../../components/dashboard-layout"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { Plus, Filter, Search } from "lucide-react"
import ClassRoomsTable from "@/components/ui/classRoomsTable"
import { toggleModal } from "@/store/slices/uiSlice"
import React, { useEffect, useCallback } from "react"
import { getClassMetadata } from "@/lib/api/classRooms"
import Loading from "@/components/ui/Loading"
import { startLoading, stopLoading } from "@/store/slices/authSlice"

// Simple, inline UI to add/edit/delete classes using prompts to keep scope small
export default function ClassesPage() {
  const { language  } = useAppSelector((state) => state.ui)
  const { loading  } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const [search, setSearch] = React.useState("")
  const [allSubjects, setAllSubjects ] = React.useState([])
  const [selectedSubject, setSelectedSubject ] = React.useState<any>(null)

  const t = {
    en: {
      title: "ClasseRooms",
      subtitle: "Manage and view all classeRooms ",
      add: "Add Class",
      all: "All classeRooms",
      name: "Name",
      teacher: "Teacher",
      students: "Students",
      status: "Status",
      actions: "Actions",
      active: "active",
      inactive: "inactive",
      searchPlaceholder: "Search classeRooms...",
      filter: "Filter",
    },
    ar: {
      title: " الفصول الدراسيه",
      subtitle: "إدارة وعرض جميع الفصول الدراسيه",
      add: "إضافة فصل",
      all: "جميع الفصول الدراسيه",
      name: "الاسم",
      teacher: "المعلم",
      students: "الطلاب",
      status: "الحالة",
      actions: "الإجراءات",
      active: "نشط",
      inactive: "غير نشط",
      searchPlaceholder: "البحث عن الفصول الدراسيه الموجوده ...",
      filter: "تصفية",
    },
  } as const

  const tr = language === "ar" ? t.ar : t.en

  const handleAdd = () => {
    dispatch(toggleModal("addClass"))
  }


  const fetchData = useCallback(async () => {
    try {
      
      const subjectsArray = await getClassMetadata()
      console.log("subjectsArray => ", subjectsArray)
      setAllSubjects(subjectsArray)
    } catch (error: any) {
      console.log("Get class metadata error => ", error)
    } finally {
    
    }
  }, [])




  useEffect(() => {
    fetchData()
  }, [fetchData])


  
  if(loading){
    return <Loading/>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{tr.title}</h1>
            <p className="text-gray-600">{tr.subtitle}</p>
          </div>
          <Button className="cursor-pointer" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            {tr.add}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={tr.searchPlaceholder}
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {tr.filter}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Classes List */}
        <Card>
          <CardHeader>
            <CardTitle>{tr.all}</CardTitle>
          </CardHeader>
          <ClassRoomsTable allSubjects={allSubjects} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} />
        </Card>
      </div>
    </DashboardLayout>
  )
}



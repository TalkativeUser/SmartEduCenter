// "use client"
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
// import { Button } from "../../../components/ui/button"
// import { Input } from "../../../components/ui/input"
// import { DashboardLayout } from "../../../components/dashboard-layout"
// import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
// import { Search, Plus, Filter, MoreHorizontal, Mail, Phone } from "lucide-react"
// import Table from "@/components/ui/studentsTable"
// import {toggleModal} from '../../../store/slices/uiSlice'

// export default function StudentsPage() {
//   const { language } = useAppSelector((state) => state.ui)
//   const dispatch=useAppDispatch()
//   const students = [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       email: "alice.johnson@school.com",
//       phone: "+1 (555) 123-4567",
//       grade: "10th Grade",
//       status: "active",
//       avatar: "/diverse-student-girl.png",
//       gpa: 3.8,
//       attendance: 95,
//     },
//     {
//       id: 2,
//       name: "Bob Smith",
//       email: "bob.smith@school.com",
//       phone: "+1 (555) 234-5678",
//       grade: "11th Grade",
//       status: "active",
//       avatar: "/student-boy.png",
//       gpa: 3.6,
//       attendance: 88,
//     },
//     {
//       id: 3,
//       name: "Carol Davis",
//       email: "carol.davis@school.com",
//       phone: "+1 (555) 345-6789",
//       grade: "9th Grade",
//       status: "inactive",
//       avatar: "/student-girl-2.png",
//       gpa: 3.9,
//       attendance: 92,
//     },
//     {
//       id: 4,
//       name: "David Wilson",
//       email: "david.wilson@school.com",
//       phone: "+1 (555) 456-7890",
//       grade: "12th Grade",
//       status: "active",
//       avatar: "/student-boy-2.png",
//       gpa: 3.7,
//       attendance: 90,
//     },
//   ]

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{language === "en" ? "Students" : "الطلاب"}</h1>
//             <p className="text-gray-600">
//               {language === "en" ? "Manage and view all students" : "إدارة وعرض جميع الطلاب"}
//             </p>
//           </div>
//           <Button 
//           className="cursor-pointer "
//             onClick={()=>{dispatch(toggleModal("addStudent"))}}
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             {language === "en" ? "Add Student" : "إضافة طالب"}
//           </Button>
//         </div>

//         {/* Search and Filters */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder={language === "en" ? "Search students..." : "البحث عن الطلاب..."}
//                   className="pl-10"
//                 />
//               </div>
//               <Button variant="outline">
//                 <Filter className="w-4 h-4 mr-2" />
//                 {language === "en" ? "Filter" : "تصفية"}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Students List */}
//         <Card>
//           <CardHeader>
//             <CardTitle>{language === "en" ? "All Students" : "جميع الطلاب"}</CardTitle>
//           </CardHeader>
//           {/* <CardContent>
//             <div className="space-y-4">
//               {students.map((student) => (
//                 <div
//                   key={student.id}
//                   className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <Avatar className="h-12 w-12">
//                       <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
//                       <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{student.name}</h3>
//                       <p className="text-sm text-gray-600">{student.grade}</p>
//                       <div className="flex items-center space-x-4 mt-1">
//                         <div className="flex items-center text-xs text-gray-500">
//                           <Mail className="w-3 h-3 mr-1" />
//                           {student.email}
//                         </div>
//                         <div className="flex items-center text-xs text-gray-500">
//                           <Phone className="w-3 h-3 mr-1" />
//                           {student.phone}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="text-right">
//                       <div className="text-sm font-medium text-gray-900">
//                         {language === "en" ? "GPA:" : "المعدل:"} {student.gpa}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         {language === "en" ? "Attendance:" : "الحضور:"} {student.attendance}%
//                       </div>
//                     </div>
//                     <Badge variant={student.status === "active" ? "default" : "secondary"}>
//                       {student.status === "active"
//                         ? language === "en"
//                           ? "Active"
//                           : "نشط"
//                         : language === "en"
//                           ? "Inactive"
//                           : "غير نشط"}
//                     </Badge>
//                     <Button variant="ghost" size="sm">
//                       <MoreHorizontal className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent> */}

//       <Table />
//         </Card>
//       </div>
//     </DashboardLayout>
//   )
// }
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { DashboardLayout } from "../../../components/dashboard-layout"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { Search, Plus, Filter } from "lucide-react"
import Table from "@/components/ui/studentsTable"
import { toggleModal } from '../../../store/slices/uiSlice'

// Translation dictionary
const translations = {
  en: {
    title: "Students",
    subtitle: "Manage and view all students",
    addStudent: "Add Student",
    searchPlaceholder: "Search students...",
    filter: "Filter",
    allStudents: "All Students",
  },
  ar: {
    title: "الطلاب",
    subtitle: "إدارة وعرض جميع الطلاب",
    addStudent: "إضافة طالب",
    searchPlaceholder: "البحث عن الطلاب...",
    filter: "تصفية",
    allStudents: "جميع الطلاب",
  },
}

export default function StudentsPage() {
  const { language } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()

  // Pick current dictionary, fallback to English
  const currentLanguage = translations[language as "en" | "ar"] || translations.en

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentLanguage.title}</h1>
            <p className="text-gray-600">{currentLanguage.subtitle}</p>
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => {
              dispatch(toggleModal("addStudent"))
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            {currentLanguage.addStudent}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder={currentLanguage.searchPlaceholder} className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {currentLanguage.filter}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>{currentLanguage.allStudents}</CardTitle>
          </CardHeader>
          <Table />
        </Card>
      </div>
    </DashboardLayout>
  )
}

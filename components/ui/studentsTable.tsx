// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import StudentRow from "./studentRow";
// import ModalManager from "./ModalManager";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./select";
// import { fetchClassesThunk } from "@/store/slices/classesSlice";
// import { fetchGroupsThunk } from "@/store/slices/groupsSlice";
// import { Group, Student } from "@/types";
// import { getAllStudentsThunk } from "@/lib/api/students";
// import Loading from "./Loading";

// // Translation dictionary
// const translations = {
//   en: {
//     name: "Name",
//     code: "Student Code",
//     phone: "Phone",
//     gender: "Gender",
//     group: "Group",
//     actions: "Actions",
//     noStudents: "No students available.",
//     noClasses: "No classes available.",
//     noGroups: "No groups available.",
//     filterByGroup: "Filter by Group",
//     filterByGender: "Filter by Gender",
//     filterByClass: "Filter by Class",
//     allGroups: "All Groups",
//     allGenders: "All Genders",
//     allClasses: "All Classes",
//     male: "Male",
//     female: "Female",
//   },
//   ar: {
//     name: "الاسم",
//     code: "رمز الطالب",
//     phone: "الهاتف",
//     gender: "الجنس",
//     group: "المجموعة",
//     actions: "الإجراءات",
//     noStudents: "لا يوجد طلاب متاحين.",
//     noClasses: "لا يوجد فصول متاحة.",
//     noGroups: "لا يوجد مجموعات متاحة.",
//     filterByGroup: "تصفية حسب المجموعة",
//     filterByGender: "تصفية حسب الجنس",
//     filterByClass: "تصفية حسب الفصل",
//     allGroups: "جميع المجموعات",
//     allGenders: "جميع الأجناس",
//     allClasses: "جميع الفصول",
//     male: "ذكر",
//     female: "أنثى",
//   },
// };

// export default function TableStudents() {
//   const dispatch = useAppDispatch();

//   // Redux data
//   const {students , studentsLoading , studentsError} = useAppSelector((state) => state.students);
//   const {classes, classesLoading, classesError } = useAppSelector((state) => state.classes);
//   const {groups,groupsLoading,groupsError} = useAppSelector((state) => state.groups);
//   const { language } = useAppSelector((state) => state.ui);

//   // Local state
//   const [studentSelected, setStudentSelected] = useState<Student | null>(null);
//   const [selectedGroup, setSelectedGroup] = useState<string>("all");
//   const [selectedGender, setSelectedGender] = useState<string>("all");
//   const [selectedClass, setSelectedClass] = useState<string>("all");

//   console.log('groupos ready to filter => ', groups)
//   const currentLanguage =
//     translations[language as "en" | "ar"] || translations.en;

//   // Fetch classes and groups on component mount
//   useEffect(() => {
//     dispatch(fetchClassesThunk());
//     dispatch(fetchGroupsThunk());
//     dispatch(getAllStudentsThunk());
//   }, [dispatch]);

//   // Filter students based on selected filters
//  // Filter students based on selected filters
// const filteredStudents = useMemo(() => {
//   return students.filter((student: Student) => {
//     const groupMatch =
//       selectedGroup === "all" || student.group_id?.toString() === selectedGroup;

//     const genderMatch =
//       selectedGender === "all" || student.geneder === selectedGender;

//     return groupMatch && genderMatch;
//   });
// }, [students, selectedGroup, selectedGender]);

//   if(studentsLoading || classesLoading|| groupsLoading) {
//     return <Loading/>
//   }

//   return (
//     <div className="space-y-4">
//       {/* Filter Controls */}
//       <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//         {/* Filter by Class */}
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             {currentLanguage.filterByClass}
//           </label>
//           <Select value={selectedClass} onValueChange={setSelectedClass}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={currentLanguage.allClasses} />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">{currentLanguage.allClasses}</SelectItem>
//               {classes ? classes.map((classItem) => (
//                 <SelectItem
//                   key={classItem.id}
//                   value={classItem.id?.toString() || "0"}
//                 >
//                   {classItem.name}
//                 </SelectItem>
//               )) : <SelectItem value="0">{currentLanguage.noClasses}</SelectItem>}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Filter by Group */}
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             {currentLanguage.filterByGroup}
//           </label>
//           <Select value={selectedGroup} onValueChange={setSelectedGroup}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={currentLanguage.allGroups} />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">{currentLanguage.allGroups}</SelectItem>
//               {groups ? groups.map((group: Group) => (
//                 <SelectItem key={group.id} value={group.id?.toString() || "0"}>
//                   {group.name}
//                 </SelectItem>
//               )) : <SelectItem value="0">{currentLanguage.noGroups}</SelectItem>}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Filter by Gender */}
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             {currentLanguage.filterByGender}
//           </label>
//           <Select value={selectedGender} onValueChange={setSelectedGender}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={currentLanguage.allGenders} />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">{currentLanguage.allGenders}</SelectItem>
//               <SelectItem value="male">{currentLanguage.male}</SelectItem>
//               <SelectItem value="female">{currentLanguage.female}</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Students Table */}
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-start">
//                 {currentLanguage.name}
//               </th>
//               <th scope="col" className="px-6 py-3 text-start">
//                 {currentLanguage.code}
//               </th>
//               <th scope="col" className="px-6 py-3 text-start">
//                 {currentLanguage.phone}
//               </th>
//               <th scope="col" className="px-6 py-3 text-start">
//                 {currentLanguage.gender}
//               </th>
//               <th scope="col" className="px-6 py-3 text-start">
//                 {currentLanguage.group}
//               </th>
//               <th scope="col" className="px-6 py-3 text-start">
//                 {currentLanguage.actions}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents ? filteredStudents.map((student) => (
//               <StudentRow
//                 key={student.id}
//                 student={student}
//                 setStudentSelected={setStudentSelected}
//               />
//             )) : <SelectItem value="0">{currentLanguage.noStudents}</SelectItem>}
//           </tbody>
//         </table>

  
//       </div>

//       {/* Modal Manager */}
//       <ModalManager
//         studentSelected={studentSelected}
//         setStudentSelected={setStudentSelected}
//       />
//     </div>
//   );
// }



"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import StudentRow from "./studentRow";
import ModalManager from "./ModalManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { fetchClassesThunk } from "@/store/slices/classesSlice";
import { fetchGroupsThunk } from "@/store/slices/groupsSlice";
import { Group, Student } from "@/types";
import { getAllStudentsThunk } from "@/lib/api/students";
import Loading from "./Loading";
import { toast } from "react-hot-toast"; // 👈 مهم لإظهار الرسائل

// Translation dictionary
const translations = {
  en: {
    name: "Name",
    code: "Student Code",
    phone: "Phone",
    gender: "Gender",
    group: "Group",
    actions: "Actions",
    noStudents: "No students available.",
    noClasses: "No classes available.",
    noGroups: "No groups available.",
    filterByGroup: "Filter by Group",
    filterByGender: "Filter by Gender",
    filterByClass: "Filter by Class",
    allGroups: "All Groups",
    allGenders: "All Genders",
    allClasses: "All Classes",
    male: "Male",
    female: "Female",
    toastSelectClass: "You must select a class first.",
    toastSelectClassGroup: "You must select a class and group first.",
  },
  ar: {
    name: "الاسم",
    code: "رمز الطالب",
    phone: "الهاتف",
    gender: "الجنس",
    group: "المجموعة",
    actions: "الإجراءات",
    noStudents: "لا يوجد طلاب متاحين.",
    noClasses: "لا يوجد فصول متاحة.",
    noGroups: "لا يوجد مجموعات متاحة.",
    filterByGroup: "تصفية حسب المجموعة",
    filterByGender: "تصفية حسب الجنس",
    filterByClass: "تصفية حسب الفصل",
    allGroups: "جميع المجموعات",
    allGenders: "جميع الأجناس",
    allClasses: "جميع الفصول",
    male: "ذكر",
    female: "أنثى",
    toastSelectClass: "لا بد من اختيار الفصل أولاً",
    toastSelectClassGroup: "لا بد من اختيار الفصل والمجموعة أولاً",
  },
};

export default function TableStudents() {
  const dispatch = useAppDispatch();

  // Redux data
  const { students, studentsLoading } = useAppSelector((state) => state.students);
  const { classes, classesLoading } = useAppSelector((state) => state.classes);
  const { groups, groupsLoading } = useAppSelector((state) => state.groups);
  const { language } = useAppSelector((state) => state.ui);

  // Local state
  const [studentSelected, setStudentSelected] = useState<Student | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  console.log('groups ready to filter => ', groups)
  const currentLanguage =
    translations[language as "en" | "ar"] || translations.en;

  // Fetch classes and groups on component mount
  useEffect(() => {
    dispatch(fetchClassesThunk());
    dispatch(fetchGroupsThunk());
    dispatch(getAllStudentsThunk());
  }, [dispatch]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((student: Student) => {
      const groupMatch =
        selectedGroup === "all" || student.group_id?.toString() === selectedGroup;

      const genderMatch =
        selectedGender === "all" || student.geneder === selectedGender;

      return groupMatch && genderMatch;
    });
  }, [students, selectedGroup, selectedGender]);

  if (studentsLoading || classesLoading || groupsLoading) {
    return <Loading />;
  }

  // Handlers
  const handleGroupClick = () => {
    if (selectedClass === "all") {
      toast.error(currentLanguage.toastSelectClass);
    }
  };

  const handleGenderClick = () => {
    if (selectedClass === "all" || selectedGroup === "all") {
      toast.error(currentLanguage.toastSelectClassGroup);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {/* Filter by Class */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {currentLanguage.filterByClass}
          </label>
          <Select
            value={selectedClass}
            onValueChange={(value) => {
              setSelectedClass(value);
              setSelectedGroup("all");
              setSelectedGender("all");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={currentLanguage.allClasses} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage.allClasses}</SelectItem>
              {classes
                ? classes.map((classItem) => (
                    <SelectItem
                      key={classItem.id}
                      value={classItem.id?.toString() || "0"}
                    >
                      {classItem.name}
                    </SelectItem>
                  ))
                : (
                  <SelectItem value="0">{currentLanguage.noClasses}</SelectItem>
                )}
            </SelectContent>
          </Select>
        </div>

        {/* Filter by Group */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {currentLanguage.filterByGroup}
          </label>
          <Select
            value={selectedGroup}
            onValueChange={setSelectedGroup}
          >
            <SelectTrigger
              className="w-full"
              onClick={handleGroupClick}
              disabled={selectedClass === "all"} // 👈 ممنوع الفتح من غير Class
            >
              <SelectValue placeholder={currentLanguage.allGroups} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage.allGroups}</SelectItem>
              {groups
                ? groups
                    .filter((g: Group) => g.class_id?.toString() === selectedClass)
                    .map((group: Group) => (
                      <SelectItem key={group.id} value={group.id?.toString() || "0"}>
                        {group.name}
                      </SelectItem>
                    ))
                : (
                  <SelectItem value="0">{currentLanguage.noGroups}</SelectItem>
                )}
            </SelectContent>
          </Select>
        </div>

        {/* Filter by Gender */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {currentLanguage.filterByGender}
          </label>
          <Select
            value={selectedGender}
            onValueChange={setSelectedGender}
          >
            <SelectTrigger
              className="w-full"
              onClick={handleGenderClick}
              disabled={selectedClass === "all" || selectedGroup === "all"} // 👈 ممنوع الفتح من غير Class + Group
            >
              <SelectValue placeholder={currentLanguage.allGenders} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage.allGenders}</SelectItem>
              <SelectItem value="male">{currentLanguage.male}</SelectItem>
              <SelectItem value="female">{currentLanguage.female}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Students Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-start">
                {currentLanguage.name}
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                {currentLanguage.code}
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                {currentLanguage.phone}
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                {currentLanguage.gender}
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                {currentLanguage.group}
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                {currentLanguage.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents && filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  setStudentSelected={setStudentSelected}
                   groups={groups}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  {currentLanguage.noStudents}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Manager */}
      <ModalManager
        studentSelected={studentSelected}
        setStudentSelected={setStudentSelected}
        allClasses={classes}
        allGroups={groups}
      />
    </div>
  );
}

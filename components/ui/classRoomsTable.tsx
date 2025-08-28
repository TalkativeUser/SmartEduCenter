"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import ClassRoomRow, { ClassItemRow } from "./classRow";
import ModalManager from "./ModalManager";

// Translation dictionary
const translations = {
  en: {
    name: "Name",
    teacher: "Teacher",
    students: "Students",
    status: "Status",
    actions: "Actions",
    noClasses: "No classrooms available.",
  },
  ar: {
    name: "الاسم",
    teacher: "المعلم",
    students: "الطلاب",
    status: "الحالة",
    actions: "الإجراءات",
    noClasses: "لا توجد فصول دراسيه موجوده حالياً",
  },
};

export default function ClassRoomsTable() {
  const classesState = useAppSelector((state) => state.classes);
  const { language } = useAppSelector((state) => state.ui);
  const [classSelected, setClassSelected] = useState<ClassItemRow | null>(null);

  const currentLanguage = translations[language as "en" | "ar"] || translations.en;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.name}</th>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.teacher}</th>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.students}</th>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.status}</th>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.actions}</th>
          </tr>
        </thead>
        <tbody>
          {classesState.map((classItem) => (
            <ClassRoomRow key={classItem.id} classItem={classItem} setClassSelected={setClassSelected} />
          ))}
        </tbody>
      </table>

      {classesState.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          {currentLanguage.noClasses}
        </div>
      )}

  
        <ModalManager
          classSelected={classSelected}
          setClassSelected={setClassSelected}
        />
   
    </div>
  );
}



"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import StudentRow, { Student } from "./studentRow";
import ModalManager from "./ModalManager";

// Translation dictionary
const translations = {
  en: {
    name: "Name",
    studentCode: "Student Code",
    parentPhone: "Parent Phone",
    groupsname: "Groups",
    classRoomName: "Classroom",
    actions: "Actions",
    noStudents: "No students available.",
  },
  ar: {
    name: "الاسم",
    studentCode: "كود الطالب",
    parentPhone: "هاتف ولي الأمر",
    groupsname: "المجموعات",
    classRoomName: "الفصل الدراسي",
    actions: "الإجراءات",
    noStudents: "لا يوجد طلاب متاحين.",
  },
};

export default function TableStudents() {
  const students = useAppSelector((state) => state.students);
  const { language } = useAppSelector((state) => state.ui);
  const [studentSelected, setStudentSelected] = useState<Student | null>(null);
  const currentLanguage = translations[language as "en" | "ar"] || translations.en;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-start">
              {currentLanguage.name}
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              {currentLanguage.studentCode}
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              {currentLanguage.parentPhone}
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              {currentLanguage.groupsname}
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              {currentLanguage.classRoomName}
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              {currentLanguage.actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              setStudentSelected={setStudentSelected}
            />
          ))}
        </tbody>
      </table>

      {students.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          {currentLanguage.noStudents}
        </div>
      )}

    
        <ModalManager
          studentSelected={studentSelected}
          setStudentSelected={setStudentSelected}
        />
    
    </div>
  );
}

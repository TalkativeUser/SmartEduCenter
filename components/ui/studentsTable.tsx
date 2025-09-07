"use client";
import React, { useState, useMemo } from "react";
import { useAppSelector } from "@/hooks/redux";
import StudentRow, { Student } from "./studentRow";
import ModalManager from "./ModalManager";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

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
    filterByGroup: "Filter by Group",
    filterByClassroom: "Filter by Classroom",
    allGroups: "All Groups",
    allClassrooms: "All Classrooms",
  },
  ar: {
    name: "الاسم",
    studentCode: "كود الطالب",
    parentPhone: "هاتف ولي الأمر",
    groupsname: "المجموعات",
    classRoomName: "الفصل الدراسي",
    actions: "الإجراءات",
    noStudents: "لا يوجد طلاب متاحين.",
    filterByGroup: "تصفية حسب المجموعة",
    filterByClassroom: "تصفية حسب الفصل الدراسي",
    allGroups: "جميع المجموعات",
    allClassrooms: "جميع الفصول",   
  },
};

export default function TableStudents() {
  const students = useAppSelector((state) => state.students);
  const { language } = useAppSelector((state) => state.ui);
  const [studentSelected, setStudentSelected] = useState<Student | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [selectedClassroom, setSelectedClassroom] = useState<string>("all");
  const currentLanguage = translations[language as "en" | "ar"] || translations.en;

  // Extract unique groups and classrooms
  const uniqueGroups = useMemo(() => {
    const allGroups = students.flatMap(student => student.groupsname);
    return Array.from(new Set(allGroups));
  }, [students]);

  const uniqueClassrooms = useMemo(() => {
    const allClassrooms = students.map(student => student.classRoomName);
    return Array.from(new Set(allClassrooms));
  }, [students]);

  // Filter students based on selected group and classroom
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const groupMatch = selectedGroup === "all" || student.groupsname.includes(selectedGroup);
      const classroomMatch = selectedClassroom === "all" || student.classRoomName === selectedClassroom;
      return groupMatch && classroomMatch;
    });
  }, [students, selectedGroup, selectedClassroom]);

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {currentLanguage.filterByGroup}
          </label>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={currentLanguage.allGroups} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage.allGroups}</SelectItem>
              {uniqueGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {currentLanguage.filterByClassroom}
          </label>
          <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={currentLanguage.allClassrooms} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage.allClassrooms}</SelectItem>
              {uniqueClassrooms.map((classroom) => (
                <SelectItem key={classroom} value={classroom}>
                  {classroom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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
          {filteredStudents.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              setStudentSelected={setStudentSelected}
            />
          ))}
        </tbody>
      </table>

      {filteredStudents.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          {currentLanguage.noStudents}
        </div>
      )}
      </div>

      <ModalManager
        studentSelected={studentSelected}
        setStudentSelected={setStudentSelected}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Check, X, User, UsersRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { createAttendance, getTodayGroupsStudents, updateStudentAttendance } from "@/lib/api/attendance";
import React from "react";
import toast from "react-hot-toast";

export type AttendanceStatus = "حاضر" | "غائب" | "متأخر";

interface Student {
  id: number;
  name: string;
  code?: string;
  // ensure we may accept status optional from API, we'll set default
  status?: AttendanceStatus;
}

interface StudentToUpdate {
  student_id: number;
  status: AttendanceStatus;
  session_time_id: number;
}

interface Group {
  group_id: number;
  group_name: string;
  students: Student[];
  session_time_id: number;
  // possible other fields from API ignored here
}

export default function AttendanceTable() {
  const [allTodayGroups, setAllTodayGroups] = useState<Group[]>([]);
  const [expandedGroupId, setExpandedGroupId] = useState<number | null>(null);
  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentToUpdate,setStudentToUpdate] = useState<StudentToUpdate | null>(null);
  const notAttendance = "لم يتم تسجيله";
  // Helper: colors & labels
  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "حاضر":
        return "bg-green-100 text-green-800";
      case "غائب":
        return "bg-red-100 text-red-800";
      case "متأخر":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };



  // Fetch groups+students for today and normalize default status
  useEffect(() => {
    const fetchTodayGroupsStudents = async () => {
      try {
        const data = await getTodayGroupsStudents(); // expected: Group[]
        // ensure each student has a status default (حاضر)
        const normalized = (data || []).map((g: any) => ({
          ...g,
          students: (g.students || []).map((s: any) => ({
            ...s,
              status: s.attendance_today? s.attendance_today.status: notAttendance ,
              // map API's student fields to our Student interface keys if needed
            id: Number(s.id),
            code: s.code || s.student_code || "",
            name: s.name || s.full_name || "",
          })),
        }));
        setAllTodayGroups(normalized);
      } catch (error) {
        console.log("get today groups students error => ", error);
      }
    };

    fetchTodayGroupsStudents();
  }, []);

  // updateAttendance: update the state immutably and immediately log the group's students + ids
  const updateAttendance = (session_time_id: number, groupId: number, studentId: number, status: AttendanceStatus) => {
    setStudentToUpdate({student_id:studentId, status, session_time_id});
    setAllTodayGroups((prev) => {
      const next = prev.map((group) =>
        group.group_id === groupId
          ? {
              ...group,
              students: group.students.map((student) =>
                student.id === studentId ? { ...student, status } : student
              ),
            }
          : group
      );

      // after computing next, find the updated group and log its students + ids
      const updatedGroup = next.find((g) => g.group_id === groupId);
      if (updatedGroup) {
        console.log(`Group ${updatedGroup.group_name} updated students:`, updatedGroup.students);
        const idsString = updatedGroup.students.map((s) => s.id).join(",");
        console.log(`Group ${updatedGroup.group_name} student IDs: ${idsString}`);
      }

      return next;
    });
  };

// registerAttendance per group
const handleRegisterGroup = async (groupId: number) => {
  const group = allTodayGroups.find((g) => g.group_id === groupId);
  if (!group) return;

  const session_time_id = group.session_time_id;

  // تحقق إن كل الطلاب عندهم حالة مش "لم يتم تسجيله"
  const hasUnregisteredStudents = group.students.some(
    (s) => (s.status as string) === notAttendance || !s.status
  );
  if (hasUnregisteredStudents) {
    toast.error("يجب اختيار حالة لكل طالب قبل تسجيل حضور المجموعة");
    return;
  }

  // جهز البيانات بعد ما كل الحالات موجودة
  const attendance = group.students.map((s) => ({
    student_id: s.id,
    status: s.status as AttendanceStatus,
  }));

  try {
    console.log("Attendance to save:", session_time_id, attendance);
    const response = await createAttendance(session_time_id, attendance);
    toast.success("تم تسجيل الحضور بنجاح ✅");
    console.log("Attendance saved:", response);
  } catch (error) {
    toast.error("فشل تسجيل الحضور ❌");
    console.error(
      `Failed to register attendance for group ${group.group_name}:`,
      error
    );
  }
};


  const handleUpdateStudentAttendance = async () => {
    if (!studentToUpdate) return;
    try {
      const response = await updateStudentAttendance(studentToUpdate);
    } catch (error) {
      console.error(`Failed to update attendance for student ${studentToUpdate.student_id}:`, error);
    }
  };


  return (
    <DashboardLayout>

        <h1 className="text-2xl font-bold mb-6 text-start " >الحضور</h1>
      <div className="container mx-auto p-4 space-y-6">
        {allTodayGroups.length === 0 ? (
          <div className="text-center py-10 text-gray-500">لا توجد مجموعات اليوم</div>
        ) : null}

        {allTodayGroups.map((group) => {
          const expandedGroup = expandedGroupId === group.group_id;

          return (
            <div key={group.group_id} className="mb-6 shadow rounded-lg border">
              {/* Group Header */}
              <div
                className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 px-4 py-3 cursor-pointer"
                onClick={() =>
                  setExpandedGroupId(expandedGroup ? null : group.group_id)
                }
              >
                <h2 className="font-bold text-gray-800 dark:text-gray-100">
                  {group.group_name}
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegisterGroup(group.group_id);
                    }}
                    className="px-3 py-1 rounded-md border border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300 hover:border-gray-400 transition-colors text-sm"
                  >
                 <UsersRound  className="inline px-1 " />
                    تسجيل الحضور
                  </button>

                  {expandedGroup ? (
                    <MinusCircle size={20} className="text-red-500" />
                  ) : (
                    <PlusCircle size={20} className="text-green-500" />
                  )}
                </div>
              </div>

              {/* Students Table (collapsible) */}
              <AnimatePresence>
                {expandedGroup && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <th className="px-4 py-3 text-start">الاسم</th>
                          <th className="px-4 py-3 text-start">كود الطالب</th>
                          <th className="px-4 py-3 text-start">الحالة</th>
                        </tr>
                      </thead>
                    
                      <tbody>
  {group.students.map((student:Student) => {
    const expandedStudent = expandedStudentId === student.id;
   

    return (
      <React.Fragment key={student.id}>
        {/* الصف الأساسي للطالب */}
        <tr key={student.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-4 py-3 text-start">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setExpandedStudentId(expandedStudent ? null : student.id)
                }
                className="text-gray-600 dark:text-gray-300 hover:opacity-80 transition-opacity"
                title={expandedStudent ? "إخفاء الخيارات" : "عرض الخيارات"}
              >
                {expandedStudent ? (
                  <MinusCircle size={18} className="text-red-500" />
                ) : (
                  <PlusCircle size={18} className="text-green-500" />
                )}
              </button>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {student.name}
              </span>
            </div>
          </td>

          <td className="px-4 py-3 text-start">{student.code || "—"}</td>

          <td className="px-4 py-3 text-start">
            <span
              className={`text-sm px-3 py-1 rounded-full ${getStatusColor(student.status as AttendanceStatus)}`}
            >
              {student.status}
            </span>
          </td>
        </tr>

        {/* صف منفصل للأزرار (بيظهر تحت الطالب) */}
        {expandedStudent && (
          <tr key={`opts-${student.id}`}>
            <td colSpan={3} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden"
              >
                <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700">
                  <Button
                    onClick={() =>
                      updateAttendance(group.session_time_id,group.group_id, student.id, "حاضر")
                    }
                    size="sm"
                    className={`flex items-center gap-2 ${student.status === "حاضر" ? "bg-green-500 text-white border-0" : "border"}`}
                  >
                    <Check className="h-4 w-4" />
                    حاضر
                  </Button>

                  <Button
                    onClick={() =>
                      updateAttendance(group.session_time_id,group.group_id, student.id, "غائب")
                    }
                    size="sm"
                    className={`flex items-center gap-2 ${student.status === "غائب" ? "bg-red-500 text-white border-0" : "border"}`}
                  >
                    <X className="h-4 w-4" />
                    غائب
                  </Button>

                  <Button
                    onClick={() =>
                      updateAttendance(group.session_time_id,group.group_id, student.id, "متأخر")
                    }
                    size="sm"
                    className={`flex items-center gap-2 ${student.status === "متأخر" ? "bg-yellow-400 text-black border-0" : "border"}`}
                  >
                    متأخر
                  </Button>
                  <Button
                    onClick={ handleUpdateStudentAttendance }
                    size="sm"
                    className={`flex items-center ms-auto gap-2 border border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300 hover:border-gray-400 transition-colors `}
                  >
                    <User />
                    تسجيل الحضور لهذا الطالب فقط
                  </Button>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  })}
</tbody>






                    </table>

                    {/* bottom register button for this group */}
                    <div className="flex justify-end p-4 border-t bg-white dark:bg-gray-800">
                      <button
                        onClick={() => {
                            handleRegisterGroup(group.group_id);
                        }}
                        className="px-4 py-2 rounded-md border border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300 hover:border-gray-400 transition-colors"
                      >
                        
                        <UsersRound className="inline  px-1" />  تسجيل الحضور لهذه المجموعة
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

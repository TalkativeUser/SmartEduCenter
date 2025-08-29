"use client";
import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux";

const groupColors: Record<string, string> = {
  "اللغة العربيه": "bg-red-100 text-red-700",
  "اللغة الانجليزيه": "bg-blue-100 text-blue-700",
  "الرياضيات": "bg-green-100 text-green-700",
  "الفيزياء": "bg-purple-100 text-purple-700",
  "الكيمياء": "bg-yellow-100 text-yellow-700",
  "علوم الحاسوب": "bg-pink-100 text-pink-700",
};

import { toggleModal } from "../../store/slices/uiSlice";
export interface Student {
  id: number;
  name: string;
  parentPhone: string;
  groupsname: string[];
  classRoomName: string;
  studentCode: string;
}

interface StudentRowProps {
  student: Student;
  setStudentSelected: React.Dispatch<React.SetStateAction<Student | null>>;
}

export default function StudentRow({ student, setStudentSelected }: StudentRowProps) {
  const dispatch = useAppDispatch();

  const handleEditStudent = (student: Student) => {
    dispatch(toggleModal("editStudent"));
    setStudentSelected(student);
  };
  const handleDeleteStudent = (student: Student) => {
    dispatch(toggleModal("deleteStudent"));
    setStudentSelected(student);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4 text-start">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div className="ms-3">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {student.name}
            </div>
          
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-start">{student.studentCode}</td>
      <td className="px-6 py-4 text-start">{student.parentPhone}</td>
      <td className="px-6 py-4 text-start">
  <div className="flex gap-1 relative group">
    {/* أول مجموعة */}
    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
      {student.groupsname[0]}
    </span>

    {/* + باقي المجموعات مع Tooltip */}
    {student.groupsname.length > 1 && (
      <div className="relative">
        <span className="text-xs text-gray-500 cursor-pointer px-2 py-1 rounded-full bg-gray-100">
          +{student.groupsname.length - 1}
        </span>

        {/* Tooltip يظهر عند Hover */}
        <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-50 w-max max-w-[200px] bg-gray-900 text-white text-xs rounded-lg p-2 shadow-lg">
          {student.groupsname.slice(1).map((g, i) => (
            <div key={i} className="mb-1 last:mb-0">
              {g}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</td>




      <td className="px-6 py-4 text-start">{student.classRoomName}</td>
      <td className="px-6 py-4 flex gap-3">
        <button
          onClick={() => handleEditStudent(student)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer hover:-translate-y-1 hover:scale-[1.2] transition-transform duration-300"
        >
          <Pencil />
        </button>
        <button
          onClick={() => handleDeleteStudent(student)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer hover:-translate-y-1 hover:scale-[1.2] transition-transform duration-300"
        >
          <Trash2 />
        </button>
      </td>
    </tr>
  );
}

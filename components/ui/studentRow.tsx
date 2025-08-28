"use client";
import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux";
import { toggleModal } from "../../store/slices/uiSlice";

export interface Student {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
  avatar: string;
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
          <img
            className="w-10 h-10 rounded-full"
            src={student.avatar}
            alt={student.name}
          />
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {student.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {student.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-start">{student.position}</td>
      <td className="px-6 py-4 text-start">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          student.status === "online"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }`}>
          {student.status}
        </span>
      </td>
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

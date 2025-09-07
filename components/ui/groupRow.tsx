"use client";
import React from "react";
import { Pencil, Trash2, Users, Calendar, Clock, DollarSign } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleModal } from "../../store/slices/uiSlice";
import type { Group } from "@/types";
import { cn } from "@/lib/utils";
import EgyptionPoundIcon from "./egyptionPoundIcon";

export interface GroupRowProps {
  group: Group;
  classId: number|undefined;
  setGroupSelected: React.Dispatch<React.SetStateAction<Group | undefined>>;
  setClassSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const groupTranslations = {
  en: {
    students: "Students",
    days: "Days",
    time: "Time",
    price: "Price",
    period: "Period",
    editGroup: "Edit Group",
    deleteGroup: "Delete Group",
  },
  ar: {
    students: "الطلاب",
    days: "الأيام", 
    time: "الوقت",
    price: "السعر",
    period: "الفترة",
    editGroup: "تعديل المجموعة",
    deleteGroup: "حذف المجموعة",
  },
};

export default function GroupRow({ group, classId, setGroupSelected, setClassSelected }: GroupRowProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const t = groupTranslations[language as "en" | "ar"] || groupTranslations.en;

  const handleEdit = () => {
    setGroupSelected(group);
    setClassSelected(classId);
    dispatch(toggleModal("editGroup"));
  };

  const handleDelete = () => {
    setGroupSelected(group);
    setClassSelected(classId);
    dispatch(toggleModal("deleteGroup"));
  };

  return (
    <tr className="border-t hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 group">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="font-medium text-gray-900 dark:text-gray-100">{group.name}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {group.day.map((day, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              <Calendar className="w-3 h-3 mr-1" />
              {day.slice(0, 3)}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {group.time.map((time, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              <Clock className="w-3 h-3 mr-1" />
              {time}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
          <Users className="w-4 h-4" />
          <span>{group.students.length}/{group.maximumStudents}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-100">
        <EgyptionPoundIcon className="w-[34px] h-[34px]" />
          <span>{group.groupPrice}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
          group.paymentPeriod === "Monthly" 
            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
        )}>
          {group.paymentPeriod}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2 opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEdit}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:-translate-y-1 hover:scale-110 transition-all duration-200 cursor-pointer "
            title={t.editGroup}
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:-translate-y-1 hover:scale-110 transition-all duration-200 cursor-pointer"
            title={t.deleteGroup}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

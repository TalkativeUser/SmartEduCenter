"use client";
import React, { useState } from "react";
import { Pencil, Trash2, PlusCircle, MinusCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleModal } from "../../store/slices/uiSlice";
import type { ClassItem, Group } from "@/types";
import { cn } from "@/lib/utils";
import GroupRow from "./groupRow";

export interface ClassItemRow extends ClassItem {}

interface ClassRowProps {
  classItem: ClassItemRow;
  setClassSelected: React.Dispatch<React.SetStateAction<ClassItemRow | undefined>>;
  setGroupSelected: React.Dispatch<React.SetStateAction<Group | undefined>>;
  setClassSelectedForGroup: React.Dispatch<React.SetStateAction<number | undefined>>;
  allSubjects: any[];
}

const groupTranslations = {
  en: {
    groupsFor: "Groups for",
    groupName: "Group Name",
    days: "Days",
    time: "Time",
    maxStudents: "Max Students",
    price: "Price",
    payment: "Payment",
    actions: "Actions",
    addGroup: "Add Group",
    noGroups: "No groups available.",
  },
  ar: {
    groupsFor: "المجموعات الخاصة بـ",
    groupName: "اسم المجموعة",
    days: "الأيام",
    time: "الوقت",
    maxStudents: "الحد الأقصى للطلاب",
    price: "السعر",
    payment: "الدفع",
    actions: "الإجراءات",
    addGroup: "إضافة مجموعة",
    noGroups: "لا يوجد مجموعات متاحة.",
  },
};



export default function ClassRoomRow({ classItem, setClassSelected, setGroupSelected, setClassSelectedForGroup, allSubjects }: ClassRowProps) {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const { language } = useAppSelector((state) => state.ui);
  const t = groupTranslations[language as "en" | "ar"] || groupTranslations.en;
  const handleEdit = (item: ClassItemRow) => {
    dispatch(toggleModal("editClass"));
    setClassSelected(item);
  };

  const handleDelete = (item: ClassItemRow) => {
    dispatch(toggleModal("deleteClass"));
    setClassSelected(item);
    console.log("classItem => ", item);
  };

  const handleAddGroup = () => {
    setClassSelectedForGroup(classItem.id);
    dispatch(toggleModal("addGroup"));
  };

  return (
    <>
      {/* Main Row */}
      <tr
        key={classItem.id}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        <td className="px-6 py-4 text-start font-semibold flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className= {cn( expanded&&"hover:text-red-400" ,
              !expanded&&"hover:text-green-400" ,
              "text-gray-600 dark:text-gray-300 dark:hover:text-white transition-transform duration-300 cursor-pointer hover:-translate-y-1 hover:scale-[1.2] transition-transform duration-300 "
            )} 
          >
            {expanded ? <MinusCircle size={22}  /> : <PlusCircle size={22} />}
          </button>
          {classItem.name}
        </td>
        <td className="px-6 py-4 text-start">{classItem.start_year}</td>
        <td className="px-6 py-4 text-start">{classItem.end_year}</td>
        {/* <td className="px-6 py-4 text-start">{classItem.year}</td> */}
        <td className="px-6 py-4 text-start">
          {allSubjects.find(subject => subject.id?.toString() === classItem.subject_id?.toString())?.name || '-'}
        </td>
        <td className="px-6 py-4 flex gap-3">
          <button
            onClick={() => handleEdit(classItem)}
            className="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer hover:-translate-y-1 hover:scale-[1.2] transition-transform duration-300 "
          >
            <Pencil />
          </button>
          <button
            onClick={() => handleDelete(classItem)}
            className="text-red-600 dark:text-red-500 hover:underline cursor-pointer hover:-translate-y-1 hover:scale-[1.2] transition-transform duration-300"
          >
            <Trash2 />
          </button>
        </td>
      </tr>

      {/* Expandable Row with animation */}
      <AnimatePresence>
      {expanded && (
        <tr>
          <td colSpan={5} className="p-0">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="m-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-inner border">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                    {t.groupsFor} {classItem.name}
                  </h4>
                  <button
                    onClick={handleAddGroup}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 hover:scale-105 transform cursor-pointer"
                  >
                    <Plus size={16} />
                    {t.addGroup}
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                      <tr>
                        <th className="px-4 py-2">{t.groupName}</th>
                        <th className="px-4 py-2">{t.days}</th>
                        <th className="px-4 py-2">{t.time}</th>
                        <th className="px-4 py-2">{t.maxStudents}</th>
                        <th className="px-4 py-2">{t.price}</th>
                        <th className="px-4 py-2">{t.payment}</th>
                        <th className="px-4 py-2">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      { classItem.groups&&classItem.groups.length > 0 ? classItem.groups.map((group) => (
                        <GroupRow
                          key={group.id}
                          group={group}
                          classId={classItem.id}
                          setGroupSelected={setGroupSelected}
                          setClassSelected={setClassSelectedForGroup}
                        />
                      )) : (
                        <tr>
                          <td colSpan={7} className="text-center py-4 text-gray-500 dark:text-gray-400">
                            {t.noGroups}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </td>
        </tr>
      )}
    </AnimatePresence>
    </>
  );
}

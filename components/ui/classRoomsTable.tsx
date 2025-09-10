"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { fetchClassesThunk } from "@/store/slices/classesSlice";
import ClassRoomRow from "./classRow";
import ModalManager from "./ModalManager";
import GroupModalsManager from "./groupModalsManager";
import type { ClassItem, Group } from "@/types";
import Loading from "./Loading";

// Translation dictionary
const translations = {
  en: {
    name: "Name",
    start_year: "Start Year",
    end_year: "End Year",
    year: "Year",
    groups: "Groups",
    subject: "Subject",
    actions: "Actions",
    noClasses: "No classrooms available.",
  },
  ar: {
    name: "الاسم",
    start_year: "السنة البدء",
    end_year: "السنة الانتهاء",
    year: "السنة",
    groups: "الفرق",
    subject: "المادة",
    actions: "الإجراءات",
    noClasses: "لا توجد فصول دراسيه موجوده حالياً",
  },
};

interface ClassRoomsTableProps {
  allSubjects: any[];
  selectedSubject: any[];
  setSelectedSubject: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ClassRoomsTable({ allSubjects, selectedSubject, setSelectedSubject }: ClassRoomsTableProps) {
  const dispatch = useAppDispatch();
  const { classes, classesLoading, classesError } = useAppSelector((state) => state.classes); 
  const { language } = useAppSelector((state) => state.ui);
  const [classSelected, setClassSelected] = useState<ClassItem | undefined>(undefined);
  const [groupSelected, setGroupSelected] = useState<Group | undefined>(undefined);
  const [classSelectedForGroup, setClassSelectedForGroup] = useState<number | undefined>(undefined);

  const currentLanguage = translations[language as "en" | "ar"] || translations.en;

  useEffect(() => {
    dispatch(fetchClassesThunk());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.name}</th>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.start_year}</th>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.end_year}</th>
            {/* <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.year}</th> */}
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.subject}</th>
            <th scope="col" className="px-6 py-3 text-start ">{currentLanguage.actions}</th>
          </tr>
        </thead>
        <tbody>
        
        {classesLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    <Loading />
                  </td>
                </tr>
              ) : classesError ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-red-500">
                    Error: {classesError}
                  </td>
                </tr>
              ) : (
                classes.map((classItem:ClassItem) => (
                  <ClassRoomRow 
                    key={classItem.id} 
                    classItem={classItem} 
                    setClassSelected={setClassSelected}
                    setGroupSelected={setGroupSelected}
                    setClassSelectedForGroup={setClassSelectedForGroup}
                    allSubjects={allSubjects}
                  />
                ))
              )}


        </tbody>
      </table>

      {!classesLoading && !classesError && classes.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          {currentLanguage.noClasses}
        </div>
      )}

      <ModalManager
        classSelected={classSelected}
        setClassSelected={setClassSelected}
        allSubjects={allSubjects}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />
      
      <GroupModalsManager 
        groupSelected={groupSelected}
        classSelected={classSelectedForGroup}
      />
   
    </div>
  );
}



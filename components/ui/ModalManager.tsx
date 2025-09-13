"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import DeleteModalStudent from "./deleteModalStudent";
import EditModalStudent from "./editModalStudent";
import OverlayModals from "./overlayModals";
import { Student } from "@/types";
import AddModalStudent from "./addModalStudent";
import DeleteModalClassRoom from "./deleteModalClass";
import EditModalClass from "./editModalClass";
import AddModalClassRoom from "./addModalClass";
import { ClassItem } from "@/types";

interface ModalManagerProps {
  studentSelected?: Student | null;
  setStudentSelected?: React.Dispatch<React.SetStateAction<Student | null>>;
  classSelected?: ClassItem | null;
  setClassSelected?: React.Dispatch<React.SetStateAction<ClassItem | undefined>>;
  allSubjects?: any[];
  selectedSubject?: any[];
  setSelectedSubject?: React.Dispatch<React.SetStateAction<any[]>>;
  allClasses?: any[];
  allGroups?: any[];
}

export default function ModalManager({ 
  studentSelected, 
  setStudentSelected, 
  classSelected, 
  setClassSelected, 
  allSubjects, 
  selectedSubject, 
  setSelectedSubject,
  allClasses = [],
  allGroups = []
}: ModalManagerProps) {
  const { modalType } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  // Provide safe fallbacks so children always receive non-optional props
  const safeStudentSelected: Student | null = studentSelected ?? null;
  const safeSetStudentSelected: React.Dispatch<React.SetStateAction<Student | null>> =
    (setStudentSelected as React.Dispatch<React.SetStateAction<Student | null>>) ?? (() => {});
  const safeClassSelected: ClassItem | null = classSelected ?? null;
  const safeSetClassSelected: React.Dispatch<React.SetStateAction<ClassItem | null>> =
    (setClassSelected as React.Dispatch<React.SetStateAction<ClassItem | null>>) ?? (() => {});

 

  return (
    <OverlayModals>
      {modalType === "deleteStudent" && (
        <DeleteModalStudent
          studentSelected={safeStudentSelected}
          setStudentSelected={safeSetStudentSelected}
        />
      )}
      {modalType === "editStudent" && (
        <EditModalStudent
          studentSelected={safeStudentSelected}
          setStudentSelected={safeSetStudentSelected}
          allClasses={allClasses}
          allGroups={allGroups}
        />
      )}
      {modalType === "addStudent" && (
        <AddModalStudent 
          allClasses={allClasses}
          allGroups={allGroups}
        />
      )}
      {modalType === "deleteClass" && (
        <DeleteModalClassRoom classSelected={safeClassSelected} setClassSelected={safeSetClassSelected} />
      )}
      {modalType === "editClass" && (
        <EditModalClass 
          classSelected={safeClassSelected} 
          setClassSelected={safeSetClassSelected}
          allSubjects={allSubjects || []}
          selectedSubject={selectedSubject || null}
          setSelectedSubject={setSelectedSubject || (() => {})}
        />
      )}
      {modalType === "addClass" && (
        <AddModalClassRoom 
          allSubjects={allSubjects || []}
          selectedSubject={selectedSubject || []}
          setSelectedSubject={setSelectedSubject || (() => {})}
        />
      )}
    </OverlayModals>
  );
}

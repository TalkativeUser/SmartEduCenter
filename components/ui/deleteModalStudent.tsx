"use client";
import React from "react";
import { useAppDispatch } from "@/hooks/redux";
import { deleteStudent } from "@/store/slices/studentsSlice";
import { toggleModal } from "@/store/slices/uiSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { Student } from "@/types";
import { deleteStudentThunk } from "@/lib/api/students";
import { toast } from "react-hot-toast";

interface IDeleteModalProps {
  studentSelected: Student | null;
  setStudentSelected: React.Dispatch<React.SetStateAction<Student | null>>;
}

export default function DeleteModalStudent({ studentSelected, setStudentSelected }: IDeleteModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);

  const handleDelete = () => {
    if (studentSelected && studentSelected.id) {
      // Call the API to delete the student
      try {
              dispatch(deleteStudentThunk(studentSelected.id))
              dispatch(deleteStudent(studentSelected.id));
              dispatch(toggleModal(null));
              setStudentSelected(null); 
              toast.success("Student deleted successfully");
    } catch (error) {
      console.log("delete student error => ", error)
    }
    }
  };

  const handleCancel = () => {
    dispatch(toggleModal(null));
    setStudentSelected(null);
  };

  const t = {
    en: {
      title: "Delete Student",
      description: "Are you sure you want to delete this student? This action cannot be undone.",
      studentInfo: "Student Information",
      name: "Name",
      gender: "Gender",
      cancel: "Cancel",
      delete: "Delete",
    },
    ar: {
      title: "حذف الطالب",
      description: "هل أنت متأكد من أنك تريد حذف هذا الطالب؟ لا يمكن التراجع عن هذا الإجراء.",
      studentInfo: "معلومات الطالب",
      name: "الاسم",
      gender: "الجنس",
      cancel: "إلغاء",
      delete: "حذف",
    },
  };

  const currentLanguage = t[language as "en" | "ar"] || t.en;

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentLanguage.title}</DialogTitle>
          <DialogDescription>{currentLanguage.description}</DialogDescription>
        </DialogHeader>
        
        {studentSelected && (
          <div className="py-4 border-t border-b">
            <h3 className="font-medium mb-2">{currentLanguage.studentInfo}</h3>
            <p><strong>{currentLanguage.name}:</strong> {studentSelected.name}</p>
            <p><strong>{currentLanguage.gender}:</strong> {studentSelected.geneder === "male" ? "Male" : "Female"}</p>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} className="cursor-pointer">
            {currentLanguage.cancel}
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">
            {currentLanguage.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

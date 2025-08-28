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
import type { Student } from "@/store/slices/studentsSlice";

interface IDeleteModalProps {
  studentSelected: Student | null;
  setStudentSelected: React.Dispatch<React.SetStateAction<Student | null>>;
}

export default function DeleteModalStudent({ studentSelected, setStudentSelected }: IDeleteModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);

  const handleDelete = () => {
    if (studentSelected) {
      dispatch(deleteStudent(studentSelected.id));
      dispatch(toggleModal(null));
      setStudentSelected(null);
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
      cancel: "Cancel",
      delete: "Delete",
    },
    ar: {
      title: "حذف الطالب",
      description: "هل أنت متأكد من أنك تريد حذف هذا الطالب؟ لا يمكن التراجع عن هذا الإجراء.",
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

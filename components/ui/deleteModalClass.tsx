"use client";
import React from "react";
import { useAppDispatch } from "@/hooks/redux";
import { deleteClassThunk } from "@/store/slices/classesSlice";
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
import type { ClassItem } from "@/types";

interface Props {
  classSelected: ClassItem | null;
  setClassSelected: React.Dispatch<React.SetStateAction<ClassItem | null>>;
}

export default function DeleteModalClassRoom({ classSelected, setClassSelected }: Props) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);

  const handleDelete = () => {
    if (classSelected && classSelected.id) {
      dispatch(deleteClassThunk(classSelected.id));
      dispatch(toggleModal(null));
      setClassSelected(null);
    }
  };

  const handleCancel = () => {
    dispatch(toggleModal(null));
    setClassSelected(null);
  };

  const t = {
    en: {
      title: "Delete Classroom",
      description: "Are you sure you want to delete this classroom? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
    },
    ar: {
      title: "حذف الفصل الدراسي",
      description: "هل أنت متأكد من أنك تريد حذف هذا الفصل الدراسي؟ لا يمكن التراجع عن هذا الإجراء.",
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



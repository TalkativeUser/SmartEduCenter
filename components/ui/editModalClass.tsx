"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { editClass } from "@/store/slices/classesSlice";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/hooks/redux";
import type { ClassItem } from "@/store/slices/classesSlice";

interface Props {
  classSelected: ClassItem | null;
  setClassSelected: React.Dispatch<React.SetStateAction<ClassItem | null>>;
}

export default function EditModalClass({ classSelected, setClassSelected }: Props) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    students: 0,
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    if (classSelected) {
      setFormData({
        name: classSelected.name,
        teacher: classSelected.teacher,
        students: classSelected.students,
        status: classSelected.status,
      });
    }
  }, [classSelected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (classSelected) {
      const updatedClass: ClassItem = {
        ...classSelected,
        ...formData,
      };
      dispatch(editClass(updatedClass));
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
      title: "Edit Classroom",
      description: "Make changes to the classroom information below.",
      name: "Class Name",
      teacher: "Teacher",
      students: "Number of Students",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      save: "Save Changes",
      cancel: "Cancel",
    },
    ar: {
      title: "تعديل الفصل الدراسي",
      description: "قم بإجراء التغييرات على معلومات الفصل الدراسي أدناه.",
      name: "اسم الفصل",
      teacher: "المعلم",
      students: "عدد الطلاب",
      status: "الحالة",
      active: "نشط",
      inactive: "غير نشط",
      save: "حفظ التغييرات",
      cancel: "إلغاء",
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{currentLanguage.name}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="teacher">{currentLanguage.teacher}</Label>
            <Input
              id="teacher"
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="students">{currentLanguage.students}</Label>
            <Input
              id="students"
              type="number"
              value={formData.students}
              onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">{currentLanguage.status}</Label>
            <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active" className="cursor-pointer">{currentLanguage.active}</SelectItem>
                <SelectItem value="inactive" className="cursor-pointer">{currentLanguage.inactive}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel} className="cursor-pointer">
              {currentLanguage.cancel}
            </Button>
            <Button type="submit" className="cursor-pointer">{currentLanguage.save}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}



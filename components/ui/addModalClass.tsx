"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { addClass } from "@/store/slices/classesSlice";
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

export default function AddModalClassRoom() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    students: 0,
    status: "active" as "active" | "inactive",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass: ClassItem = {
      id: Date.now(), // Simple ID generation
      ...formData,
    };
    dispatch(addClass(newClass));
    dispatch(toggleModal(null));
    setFormData({ name: "", teacher: "", students: 0, status: "active" });
  };

  const handleCancel = () => {
    dispatch(toggleModal(null));
    setFormData({ name: "", teacher: "", students: 0, status: "active" });
  };

  const t = {
    en: {
      title: "Add New Classroom",
      description: "Fill in the information below to create a new classroom.",
      name: "Class Name",
      teacher: "Teacher",
      students: "Number of Students",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      add: "Add Classroom",
      cancel: "Cancel",
    },
    ar: {
      title: "إضافة فصل دراسي جديد",
      description: "املأ المعلومات أدناه لإنشاء فصل دراسي جديد.",
      name: "اسم الفصل",
      teacher: "المعلم",
      students: "عدد الطلاب",
      status: "الحالة",
      active: "نشط",
      inactive: "غير نشط",
      add: "إضافة فصل دراسي",
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
            <Button type="submit" className="cursor-pointer">{currentLanguage.add}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}



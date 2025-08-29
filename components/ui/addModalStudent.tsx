"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { addStudent } from "@/store/slices/studentsSlice";
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
import type { Student } from "@/store/slices/studentsSlice";

interface IAddModalProps {
  // Add specific props if needed
}

export default function AddModalStudent({}: IAddModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = useState({
    name: "",
    parentPhone: "",
    groupsname: [] as string[],
    classRoomName: "",
    studentCode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: Date.now(), // Simple ID generation
      ...formData,
    };
    dispatch(addStudent(newStudent));
    dispatch(toggleModal(null));
    setFormData({
      name: "",
      parentPhone: "",
      groupsname: [],
      classRoomName: "",
      studentCode: "",
    });
  };

  const handleCancel = () => {
    dispatch(toggleModal(null));
    setFormData({
      name: "",
      parentPhone: "",
      groupsname: [],
      classRoomName: "",
      studentCode: "",
    });
  };

  const t = {
    en: {
      title: "Add New Student",
      description: "Fill in the information below to create a new student profile.",
      name: "Full Name",
      parentPhone: "Parent Phone",
      groupsname: "Groups",
      classRoomName: "Classroom",
      studentCode: "Student Code",
      add: "Add Student",
      cancel: "Cancel",
    },
    ar: {
      title: "إضافة طالب جديد",
      description: "املأ المعلومات أدناه لإنشاء ملف طالب جديد.",
      name: "الاسم الكامل",
      parentPhone: "هاتف ولي الأمر",
      groupsname: "المجموعات",
      classRoomName: "الفصل الدراسي",
      studentCode: "رمز الطالب",
      add: "إضافة طالب",
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
            <Label htmlFor="parentPhone">{currentLanguage.parentPhone}</Label>
            <Input
              id="parentPhone"
              type="tel"
              value={formData.parentPhone}
              onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="groupsname">{currentLanguage.groupsname}</Label>
            <Input
              id="groupsname"
              value={formData.groupsname.join(", ")}
              onChange={(e) => setFormData({ ...formData, groupsname: e.target.value.split(", ").filter(g => g.trim() !== "") })}
              placeholder="Enter groups separated by commas"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="classRoomName">{currentLanguage.classRoomName}</Label>
            <Input
              id="classRoomName"
              value={formData.classRoomName}
              onChange={(e) => setFormData({ ...formData, classRoomName: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="studentCode">{currentLanguage.studentCode}</Label>
            <Input
              id="studentCode"
              value={formData.studentCode}
              onChange={(e) => setFormData({ ...formData, studentCode: e.target.value })}
              required
            />
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

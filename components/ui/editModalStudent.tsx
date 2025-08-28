"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { editStudent } from "@/store/slices/studentsSlice";
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

interface IEditModalProps {
  studentSelected: Student | null;
  setStudentSelected: React.Dispatch<React.SetStateAction<Student | null>>;
}

export default function EditModalStudent({ studentSelected, setStudentSelected }: IEditModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    status: "online" as "online" | "offline",
    avatar: "",
  });

  useEffect(() => {
    if (studentSelected) {
      setFormData({
        name: studentSelected.name,
        email: studentSelected.email,
        position: studentSelected.position,
        status: studentSelected.status as "online" | "offline",
        avatar: studentSelected.avatar,
      });
    }
  }, [studentSelected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentSelected) {
      const updatedStudent: Student = {
        ...studentSelected,
        ...formData,
      };
      dispatch(editStudent(updatedStudent));
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
      title: "Edit Student",
      description: "Make changes to the student information below.",
      name: "Full Name",
      email: "Email Address",
      position: "Position/Role",
      status: "Status",
      online: "Online",
      offline: "Offline",
      save: "Save Changes",
      cancel: "Cancel",
    },
    ar: {
      title: "تعديل الطالب",
      description: "قم بإجراء التغييرات على معلومات الطالب أدناه.",
      name: "الاسم الكامل",
      email: "عنوان البريد الإلكتروني",
      position: "المنصب/الدور",
      status: "الحالة",
      online: "متصل",
      offline: "غير متصل",
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
            <Label htmlFor="email">{currentLanguage.email}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">{currentLanguage.position}</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">{currentLanguage.status}</Label>
            <Select value={formData.status} onValueChange={(value: "online" | "offline") => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online" className="cursor-pointer">{currentLanguage.online}</SelectItem>
                <SelectItem value="offline" className="cursor-pointer">{currentLanguage.offline}</SelectItem>
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

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
    email: "",
    position: "",
    status: "online",
    avatar: "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
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
      email: "",
      position: "",
      status: "online",
      avatar: "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
    });
  };

  const handleCancel = () => {
    dispatch(toggleModal(null));
    setFormData({
      name: "",
      email: "",
      position: "",
      status: "online",
      avatar: "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
    });
  };

  const t = {
    en: {
      title: "Add New Student",
      description: "Fill in the information below to create a new student profile.",
      name: "Full Name",
      email: "Email Address",
      position: "Position/Role",
      status: "Status",
      online: "Online",
      offline: "Offline",
      add: "Add Student",
      cancel: "Cancel",
    },
    ar: {
      title: "إضافة طالب جديد",
      description: "املأ المعلومات أدناه لإنشاء ملف طالب جديد.",
      name: "الاسم الكامل",
      email: "عنوان البريد الإلكتروني",
      position: "المنصب/الدور",
      status: "الحالة",
      online: "متصل",
      offline: "غير متصل",
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
            <Button type="submit" className="cursor-pointer">{currentLanguage.add}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

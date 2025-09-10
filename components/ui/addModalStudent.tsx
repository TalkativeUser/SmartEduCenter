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
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({ 
    name: "", 
    geneder: "male", 
    phone: "", 
    group_id: 1, 
    code: "", 
    email: "", 
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
      geneder: "male", 
      phone: "", 
      group_id: 1, 
      code: "", 
      email: "", 
    });
  };

  const handleCancel = () => {
    dispatch(toggleModal(null));
    setFormData({ 
      name: "", 
      geneder: "male", 
      phone: "", 
      group_id: 1, 
      code: "", 
      email: "", 
    });
  };

  const t = {
    en: {
      title: "Add New Student",
      description: "Fill in the information below to create a new student profile.",
      name: "Full Name",
      phone: "Phone Number",
      group_id: "Group ID",
      code: "Student Code",
      email: "Email Address",
      gender: "Gender",
      male: "Male",
      female: "Female",
      add: "Add Student",
      cancel: "Cancel",
    },
    ar: {
      title: "إضافة طالب جديد",
      description: "املأ المعلومات أدناه لإنشاء ملف طالب جديد.",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      group_id: "معرف المجموعة",
      code: "رمز الطالب",
      email: "البريد الإلكتروني",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
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
            <Label htmlFor="gender">{currentLanguage.gender}</Label>
            <Select 
              value={formData.geneder} 
              onValueChange={(value: "male" | "female") => setFormData({ ...formData, geneder: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={currentLanguage.gender} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{currentLanguage.male}</SelectItem>
                <SelectItem value="female">{currentLanguage.female}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">{currentLanguage.phone}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="group_id">{currentLanguage.group_id}</Label>
            <Input
              id="group_id"
              type="number"
              value={formData.group_id}
              onChange={(e) => setFormData({ ...formData, group_id: parseInt(e.target.value) || 1 })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">{currentLanguage.code}</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{currentLanguage.email}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

"use client";
import React, { useState, useEffect } from "react";
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
import type { Student } from "@/types";
import { createStudent } from "@/lib/api/students";

interface IAddModalProps {
  allClasses?: any[];
  allGroups?: any[];
}

export default function AddModalStudent({ allClasses = [], allGroups = [] }: IAddModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({ 
    name: "", 
    geneder: "male", 
    phone: "", 
    group_id: 0, 
    code: "", 
    email: "", 
  });
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);

  useEffect(() => {
    if (selectedClassId && allGroups) {
      const filtered = allGroups.filter(group => group.class_id?.toString() === selectedClassId);
      setFilteredGroups(filtered);
      
      setFormData(prev => ({
        ...prev,
        group_id: 0
      }));
    } else {
      setFilteredGroups([]);
    }
  }, [selectedClassId, allGroups]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClassId) {
      // toast.error(translations[language as 'en' | 'ar'].toastSelectClass);
      return;
    }
    
    if (!formData.group_id) {
      // toast.error(translations[language as 'en' | 'ar'].toastSelectClassGroup);
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      ...formData,
    };

    createStudent(newStudent);
    dispatch(addStudent(newStudent));
    dispatch(toggleModal(null));
    
    setFormData({ 
      name: "", 
      geneder: "male", 
      phone: "", 
      group_id: 0, 
      code: "", 
      email: "", 
    });
    setSelectedClassId("");
  };

  const handleCancel = () => {
    dispatch(toggleModal(null));
    setFormData({ 
      name: "", 
      geneder: "male", 
      phone: "", 
      group_id: 0, 
      code: "", 
      email: "", 
    });
    setSelectedClassId("");
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
      class: "Class",
      selectClass: "Select Class",
      selectClassFirst: "Please select a class first",
      selectGroup: "Select Group",
      group: "Group",
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
      class: "الصف",
      selectClass: "اختر الصف",
      selectClassFirst: "الرجاء اختيار صف أولا",
      selectGroup: "اختر المجموعة",
      group: "المجموعة",
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
          <div className="space-y-2">
            <Label htmlFor="class">{currentLanguage.class}</Label>
            <Select
              value={selectedClassId}
              onValueChange={(value) => setSelectedClassId(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={currentLanguage.selectClass} />
              </SelectTrigger>
              <SelectContent>
                {allClasses?.map((classItem) => (
                  <SelectItem key={classItem.id} value={classItem.id?.toString()}>
                    {classItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="group">{currentLanguage.group}</Label>
            <Select
              value={formData.group_id?.toString() || ""}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                group_id: parseInt(value, 10)
              }))}
              disabled={!selectedClassId}
            >
              <SelectTrigger>
                <SelectValue 
                  placeholder={selectedClassId ? currentLanguage.selectGroup : currentLanguage.selectClassFirst} 
                />
              </SelectTrigger>
              <SelectContent>
                {filteredGroups.map((group) => (
                  <SelectItem key={group.id} value={group.id?.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

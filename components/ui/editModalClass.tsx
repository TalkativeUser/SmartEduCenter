"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { updateClassThunk } from "@/store/slices/classesSlice";
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
import type { ClassItem } from "@/types";

interface Props {
  classSelected: ClassItem | null;
  setClassSelected: React.Dispatch<React.SetStateAction<ClassItem | null>>;
  allSubjects: any[];
  selectedSubject: any;
  setSelectedSubject: React.Dispatch<React.SetStateAction<any>>;
}

export default function EditModalClass({ classSelected, setClassSelected, allSubjects, selectedSubject, setSelectedSubject }: Props) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = useState({
    name: "",
    start_year: "",
    end_year: "",
    year: "",
    status: true,
    subject_id: 0,
  });

  useEffect(() => {
    if (classSelected) {
      setFormData({
        name: classSelected.name,
        start_year: classSelected.start_year,
        end_year: classSelected.end_year,
        year: classSelected.year || "1",
        status: classSelected.status === "1" || (typeof classSelected.status === 'boolean' && classSelected.status),
        subject_id: Number(classSelected.subject_id) || 0,
      });
    }
  }, [classSelected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (classSelected && classSelected.id) {
      const updateData = {
        start_year: Number(formData.start_year),
        end_year: Number(formData.end_year),
        name: formData.name,
        status: formData.status,
        subject_id: formData.subject_id,
        year: Number(formData.year),
      };
      dispatch(updateClassThunk({ classId: classSelected.id, updateData }));
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
      startYear: "Start Year",
      endYear: "End Year",
      year: "Year",
      subject: "Subject",
      selectSubject: "Select a subject",
      save: "Save Changes",
      cancel: "Cancel",
    },
    ar: {
      title: "تعديل الفصل الدراسي",
      description: "قم بإجراء التغييرات على معلومات الفصل الدراسي أدناه.",
      name: "اسم الفصل",
      startYear: "السنة البدء",
      endYear: "السنة الانتهاء",
      year: "السنة",
      subject: "المادة",
      selectSubject: "اختر مادة",
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
            <Label htmlFor="startYear">{currentLanguage.startYear}</Label>
            <Input
              id="startYear"
              type="number"
              value={formData.start_year}
              onChange={(e) => setFormData({ ...formData, start_year: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endYear">{currentLanguage.endYear}</Label>
            <Input
              id="endYear"
              type="number"
              value={formData.end_year}
              onChange={(e) => setFormData({ ...formData, end_year: e.target.value })}
              required
            />
          </div>
      
        <div className="grid gap-2">
          <Label htmlFor="year">{currentLanguage.year}</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subject">{currentLanguage.subject}</Label>
          <Select 
            value={formData.subject_id?.toString() || ''} 
            onValueChange={(value) => {
              setFormData({ ...formData, subject_id: Number(value) });
              const selected = allSubjects.find(subject => subject.id?.toString() === value);
              setSelectedSubject(selected);
              console.log('Selected subject:', selected);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={currentLanguage.selectSubject} />
            </SelectTrigger>
            <SelectContent className="max-h-[250px] overflow-y-auto">
              {allSubjects?.map((subject) => (
                <SelectItem key={subject.id} value={subject.id?.toString() || ''}>
                  {subject.name}
                </SelectItem>
              ))}
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



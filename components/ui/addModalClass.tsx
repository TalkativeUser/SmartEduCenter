"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { addClass } from "@/store/slices/classesSlice";
import { toggleModal } from "@/store/slices/uiSlice";
import {  createClassRoom } from "@/lib/api/classRooms";
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

interface AddModalClassRoomProps {
  allSubjects: any[];
  selectedSubject: any;
  setSelectedSubject: React.Dispatch<React.SetStateAction<any>>;
}

export default function AddModalClassRoom({ allSubjects, selectedSubject, setSelectedSubject }: AddModalClassRoomProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = useState<ClassItem> ({
    name: "",
    start_year: "",
    end_year: "",
    year: "",
    groups: [],
    subject_id: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the API to create the classroom
     const createdClass = await createClassRoom(formData);
      console.log("createdClass => ", createdClass);
      
      // Add the created class to Redux store
      const newClass: ClassItem = {
     
       year:formData.year,
        ...createdClass // Merge any additional data from API response
      };
      dispatch(addClass(newClass));
      
      dispatch(toggleModal(null));
      setFormData({ id:undefined,name: "", start_year: "", end_year: "", year: "", groups: [], subject_id: undefined });
      
      // console.log('Classroom created successfully:', createdClass);
    } catch (error) {
      console.error('Failed to create classroom:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleCancel = () => {
    dispatch(toggleModal(null));
    setFormData({ id:undefined,name: "", start_year: "", end_year: "", year: "", groups: [], subject_id: undefined });
  };

  const t = {
    en: {
      title: "Add New Classroom",
      description: "Fill in the information below to create a new classroom.",
      name: "Class Name",
      start_year: "Start Year",
      end_year: "End Year",
      year: "Year",
      subject: "Subject",
      selectSubject: "Select a subject",
      add: "Add Classroom",
      cancel: "Cancel",
    },
    ar: {
      title: "إضافة فصل دراسي جديد",
      description: "املأ المعلومات أدناه لإنشاء فصل دراسي جديد.",
      name: "اسم الفصل",
      start_year: "السنة البدء",
      end_year: "السنة الانتهاء",
      year: "السنة",
      subject: "المادة",
      selectSubject: "اختر مادة",
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
            <Label htmlFor="start_year">{currentLanguage.start_year}</Label>
            <Input
              id="start_year"
              value={formData.start_year}
              onChange={(e) => setFormData({ ...formData, start_year: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end_year">{currentLanguage.end_year}</Label>
            <Input
              id="end_year"
              type="text"
              value={formData.end_year}
              onChange={(e) => setFormData({ ...formData, end_year: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">{currentLanguage.year}</Label>
            <Input
              id="year"
              type="text"
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
                setFormData({ ...formData, subject_id: value });
                const selected = allSubjects.find(subject => subject.id?.toString() === value);
                setSelectedSubject(selected);
                console.log('Selected subject:', selected);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={currentLanguage.selectSubject} />
              </SelectTrigger>
              <SelectContent className="max-h-[250px] overflow-y-auto" >
                {allSubjects?.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id?.toString() || ''}  onChange={() => setFormData({ ...formData, subject_id: subject.id })} >
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
            <Button type="submit" className="cursor-pointer">{currentLanguage.add}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}



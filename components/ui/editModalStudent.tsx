"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { editStudent } from "@/store/slices/studentsSlice";
import { toggleModal } from "@/store/slices/uiSlice";
import { updateStudentThunk } from "@/lib/api/students";
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

interface IEditModalProps {
  studentSelected: Student | null;
  setStudentSelected: React.Dispatch<React.SetStateAction<Student | null>>;
  allClasses?: any[];
  allGroups?: any[];
}

export default function EditModalStudent({ 
  studentSelected, 
  setStudentSelected, 
  allClasses = [], 
  allGroups = [] 
}: IEditModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({ 
    name: "", 
    geneder: "male" as 'male' | 'female', 
    phone: "", 
    group_id: 0, 
    code: "", 
    email: "", 
  });
  
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  // Initialize form data and find the class ID for the student's group
  useEffect(() => {
    if (studentSelected && allGroups.length > 0 && allClasses.length > 0) {
      // Find the student's group
      const studentGroup = allGroups.find(g => g.id === studentSelected.group_id);
      const classId = studentGroup?.class_id?.toString() || "";
      
      // Set the form data with the student's current values
      setFormData({
        name: studentSelected.name,
        geneder: studentSelected.geneder,
        phone: studentSelected.phone,
        group_id: studentSelected.group_id,
        code: studentSelected.code || "",
        email: studentSelected.email || "",
      });
      
      // Set the selected class and filter groups
      setSelectedClassId(classId);
      setInitialLoad(false);
    }
  }, [studentSelected, allGroups, allClasses]);

  // Filter groups when selected class changes
  useEffect(() => {
    if (selectedClassId && allGroups) {
      const filtered = allGroups.filter(group => group.class_id?.toString() === selectedClassId);
      setFilteredGroups(filtered);
      
      // Only reset group selection if we're not in initial load and the current group is not in the filtered groups
      if (!initialLoad && !filtered.some(g => g.id === formData.group_id)) {
        setFormData(prev => ({
          ...prev,
          group_id: 0
        }));
      }
    } else {
      setFilteredGroups([]);
    }
  }, [selectedClassId, allGroups, initialLoad, formData.group_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Always use the original group_id if no new one is selected
    const finalGroupId = formData.group_id || studentSelected?.group_id;
    
    if (!finalGroupId) {
      // Show error if no group is selected at all
      // toast.error(currentLanguage.toastSelectClassGroup);
      return;
    }

    if (studentSelected) {
      const updatedStudent: Student = {
        ...studentSelected,
        ...formData,
        group_id: finalGroupId, // Use the final group_id (either new or original)
      };
      
      try {

        if (!studentSelected.id) {
          throw new Error("Student ID is missing");
        }

        // Call the API to update the student
        const resultAction = await dispatch(updateStudentThunk({
          id: studentSelected.id ,
          updatedData: {
            name: updatedStudent.name,
            phone: updatedStudent.phone,
            geneder: updatedStudent.geneder,
            group_id: updatedStudent.group_id,
            email: updatedStudent.email || undefined,
            code: updatedStudent.code || undefined
          }
        }));

        // Check if the API call was successful
        if (updateStudentThunk.fulfilled.match(resultAction)) {
          // Update the local state with the updated student data from the API
          dispatch(editStudent(updatedStudent));
          dispatch(toggleModal(null));
          setStudentSelected(null);
        } else {
          // Handle the case when the API call fails
          throw new Error(resultAction.payload as string);
        }
      } catch (error) {
        console.error("Error updating student:", error);
        // toast.error("Failed to update student. Please try again.");
      }
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
      phone: "Phone Number",
      group: "Group",
      code: "Student Code",
      email: "Email Address",
      gender: "Gender",
      class: "Class",
      selectClass: "Select Class",
      selectClassFirst: "Please select a class first",
      selectGroup: "Select Group",
      male: "Male",
      female: "Female",
      save: "Save Changes",
      cancel: "Cancel",
    },
    ar: {
      title: "تعديل الطالب",
      description: "قم بإجراء التغييرات على معلومات الطالب أدناه.",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      group: "المجموعة",
      code: "رمز الطالب",
      email: "البريد الإلكتروني",
      gender: "الجنس",
      class: "الصف",
      selectClass: "اختر الصف",
      selectClassFirst: "الرجاء اختيار صف أولا",
      selectGroup: "اختر المجموعة",
      male: "ذكر",
      female: "أنثى",
      save: "حفظ التغييرات",
      cancel: "إلغاء",
    },
  };

  const currentLanguage = t[language as "en" | "ar"] || t.en;

  // Update the group selector to show the current group even if not in filtered groups
  const currentGroup = allGroups.find(g => g.id === formData.group_id);
  const showCurrentGroup = currentGroup && !filteredGroups.some(g => g.id === currentGroup.id);

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentLanguage.title}</DialogTitle>
          <DialogDescription>{currentLanguage.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{currentLanguage.name}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              >
                <SelectTrigger>
                  <SelectValue placeholder={currentLanguage.selectGroup} />
                </SelectTrigger>
                <SelectContent>
                  {/* Show current group if it's not in the filtered groups */}
                  {showCurrentGroup && (
                    <SelectItem 
                      key={currentGroup.id} 
                      value={currentGroup.id?.toString()}
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      {currentGroup.name} (Current)
                    </SelectItem>
                  )}
                  {filteredGroups.map((group) => (
                    <SelectItem 
                      key={group.id} 
                      value={group.id?.toString()}
                    >
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{currentLanguage.phone}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{currentLanguage.email}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">{currentLanguage.gender}</Label>
              <Select
                value={formData.geneder}
                onValueChange={(value) => setFormData({ ...formData, geneder: value as 'male' | 'female' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{currentLanguage.male}</SelectItem>
                  <SelectItem value="female">{currentLanguage.female}</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

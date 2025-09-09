"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Edit,
  Calendar,
  Clock,
  Users,
  DollarSign,
  FileText,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleModal } from "@/store/slices/uiSlice";
import { editGroupInClass } from "@/store/slices/classesSlice";
import type { Group } from "@/types";
import { updateGroup } from "@/lib/api/groups";

interface EditGroupModalProps {
  isOpen: boolean;
  group: Group | undefined;
  classId: number | undefined;
}

const translations = {
  en: {
    editGroup: "Edit Group",
    groupName: "Group Name",
    days: "Days",
    time: "Time",
    maxStudents: "Maximum Students",
    price: "Group Price",
    paymentPeriod: "Payment Period",
    startDate: "Start Date",
    description: "Description",
    numberOfSessions: "Number of Sessions",
    cancel: "Cancel",
    save: "Save Changes",
    daily: "Daily",
    monthly: "Monthly",
    selectDays: "Select Days",
    addTime: "Add Time",
  },
  ar: {
    editGroup: "تعديل المجموعة",
    groupName: "اسم المجموعة",
    days: "الأيام",
    time: "الوقت",
    maxStudents: "الحد الأقصى للطلاب",
    price: "سعر المجموعة",
    paymentPeriod: "فترة الدفع",
    startDate: "تاريخ البداية",
    description: "الوصف",
    numberOfSessions: "عدد الحصص",
    cancel: "إلغاء",
    save: "حفظ التغييرات",
    daily: "يومي",
    monthly: "شهري",
    selectDays: "اختر الأيام",
    addTime: "إضافة وقت",
  },
};

const daysOfWeek = [
  { key: "Sunday", en: "Sunday", ar: "الأحد" },
  { key: "Monday", en: "Monday", ar: "الإثنين" },
  { key: "Tuesday", en: "Tuesday", ar: "الثلاثاء" },
  { key: "Wednesday", en: "Wednesday", ar: "الأربعاء" },
  { key: "Thursday", en: "Thursday", ar: "الخميس" },
  { key: "Friday", en: "Friday", ar: "الجمعة" },
  { key: "Saturday", en: "Saturday", ar: "السبت" },
];

export default function EditGroupModal({
  isOpen,
  group,
  classId,
}: EditGroupModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const t = translations[language as "en" | "ar"] || translations.en;

  const [formData, setFormData] = useState({
    name: "",
    class_id: 0,
    number_of_sessions: 10,
    price_of_group: 1000,
    maximum_students: 0,
    payment_period: "Monthly" as "Monthly" | "Daily",
    start_date: "",
    group_description: "",
    times: [] as { session_time: string; day_name: string }[],
    day: [] as string[],
    time: [""],
  });

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name,
        class_id: group.class_id || 0,
        number_of_sessions: group.number_of_sessions || 0,
        price_of_group: group.price_of_group || 0,
        maximum_students: group.maximum_students || 0,
        payment_period: group.payment_period || "Monthly",
        start_date: group.start_date || "",
        group_description: group.group_description || "",
        times: group.times || [],
        day: group.times?.map((item) => item.day_name) || [],
        time: group.times?.map((item) => item.session_time) || [""],
      });
    }
  }, [group, classId]);

  const handleClose = () => {
    dispatch(toggleModal(null));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      day: prev.day.includes(day)
        ? prev.day.filter((d) => d !== day)
        : [...prev.day, day],
    }));
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...formData.time];
    newTimes[index] = value;
    setFormData((prev) => ({ ...prev, time: newTimes }));
  };

  const addTimeSlot = () => {
    setFormData((prev) => ({ ...prev, time: [...prev.time, ""] }));
  };

  const removeTimeSlot = (index: number) => {
    if (formData.time.length > 1) {
      const newTimes = formData.time.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, time: newTimes }));
    }
  };

  const handleSave = async () => {
  if (!group || !classId || !formData.name.trim() || formData.day.length === 0) {
    console.log("group or classId or name or day is empty");
    return;
  }

  // remove empty times
  const times = formData.day
    .flatMap((day) =>
      formData.time.map((time) => ({
        day_name: day,
        session_time: time,
      }))
    )
    .filter((item) => item.session_time.trim() !== "");

  // البيانات اللي هتتبعت
  const newGroup: Group = {
    ...group,
    name: formData.name,
    class_id: classId,
    number_of_sessions: formData.number_of_sessions,
    price_of_group: formData.price_of_group,
    maximum_students: formData.maximum_students,
    payment_period: formData.payment_period,
    start_date: formData.start_date,
    group_description: formData.group_description,
    times,
  };

  try {
    const updatedGroup = await updateGroup(newGroup);
    console.log("updatedGroup from handleSave method => ",updatedGroup);
    
    // dispatch(editGroupInClass({ classId, group: updatedGroup }));

    // handleClose();
  } catch (error) {
    console.error("Failed to update group:", error);
  }
};


  if (!group) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600" />
                {t.editGroup}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.groupName}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t.groupName}
                />
              </div>

              {/* Days Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.days}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() => handleDayToggle(day.key)}
                      className={`flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                        formData.day.includes(day.key)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {language === "ar" ? day.ar : day.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.time}
                </label>
                <div className="space-y-2">
                  {formData.time.map((time, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                          handleTimeChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      {formData.time.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTimeSlot}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    {t.addTime}
                  </button>
                </div>
              </div>

              {/* Maximum Students */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.maxStudents}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    value={formData.maximum_students}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maximum_students: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.price}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    value={formData.price_of_group}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price_of_group: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="0"
                  />
                </div>
              </div>

              {/* Payment Period & Start Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.paymentPeriod}
                  </label>
                  <select
                    value={formData.payment_period}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        payment_period: e.target.value as "Daily" | "Monthly",
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Monthly">{t.monthly}</option>
                    <option value="Daily">{t.daily}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.startDate}
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        start_date: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Number of Sessions */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.numberOfSessions}
                </label>
                <input
                  type="number"
                  value={formData.number_of_sessions}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      number_of_sessions: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  min="1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.description}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <textarea
                    value={formData.group_description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        group_description: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder={t.description}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name.trim() || formData.day.length === 0}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md disabled:cursor-not-allowed"
              >
                {t.save}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

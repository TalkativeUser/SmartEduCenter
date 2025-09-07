"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Calendar, Clock, Users, DollarSign } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleModal } from "../../store/slices/uiSlice";
import { addGroupToClass } from "@/store/slices/classesSlice";
import type { Group } from "@/types";
import EgyptionPoundIcon from "./egyptionPoundIcon";

interface AddGroupModalProps {
  isOpen: boolean;
  classId: number | undefined;
}

const translations = {
  en: {
    addGroup: "Add New Group",
    groupName: "Group Name",
    days: "Days",
    time: "Time",
    maxStudents: "Maximum Students",
    price: "Group Price",
    paymentPeriod: "Payment Period",
    startDate: "Start Date",
    numberOfSessions: "Number of Sessions",
    description: "Description",
    cancel: "Cancel",
    save: "Save Group",
    daily: "Daily",
    monthly: "Monthly",
    selectDays: "Select Days",
    addTime: "Add Time",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  },
  ar: {
    addGroup: "إضافة مجموعة جديدة",
    groupName: "اسم المجموعة",
    days: "الأيام",
    time: "الوقت",
    maxStudents: "الحد الأقصى للطلاب",
    price: "سعر المجموعة",
    paymentPeriod: "فترة الدفع",
    startDate: "تاريخ البداية",
    numberOfSessions: "عدد الحصص",
    description: "الوصف",
    cancel: "إلغاء",
    save: "حفظ المجموعة",
    daily: "يومي",
    monthly: "شهري",
    selectDays: "اختر الأيام",
    addTime: "إضافة وقت",
    monday: "الإثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
    sunday: "الأحد",
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

export default function AddGroupModal({ isOpen, classId }: AddGroupModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const t = translations[language as "en" | "ar"] || translations.en;

  const [formData, setFormData] = useState({
    name: "",
    day: [] as string[],
    time: [""],
    maximumStudents: 20,
    groupPrice: 100,
    paymentPeriod: "Monthly" as "Daily" | "Monthly",
    startDate: new Date().toISOString().split('T')[0],
    numberOfSessions: 10,
    groupDescription: "",
  });

  const handleClose = () => {
    dispatch(toggleModal(null));
    setFormData({
      name: "",
      day: [],
      time: [""],
      maximumStudents: 20,
      groupPrice: 100,
      paymentPeriod: "Monthly",
      startDate: new Date().toISOString().split('T')[0],
      numberOfSessions: 10,
      groupDescription: "",
    });
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      day: prev.day.includes(day)
        ? prev.day.filter(d => d !== day)
        : [...prev.day, day]
    }));
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...formData.time];
    newTimes[index] = value;
    setFormData(prev => ({ ...prev, time: newTimes }));
  };

  const addTimeSlot = () => {
    setFormData(prev => ({ ...prev, time: [...prev.time, ""] }));
  };

  const removeTimeSlot = (index: number) => {
    if (formData.time.length > 1) {
      const newTimes = formData.time.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, time: newTimes }));
    }
  };

  const handleSave = () => {
    if (!classId || !formData.name.trim() || formData.day.length === 0) return;

    const newGroup: Group = {
      id: Date.now(),
      name: formData.name,
      day: formData.day,
      time: formData.time.filter(t => t.trim() !== ""),
      maximumStudents: formData.maximumStudents,
      groupPrice: formData.groupPrice,
      paymentPeriod: formData.paymentPeriod,
      startDate: formData.startDate,
      numberOfSessions: formData.numberOfSessions,
      groupDescription: formData.groupDescription,
      students: [],
    };

    dispatch(addGroupToClass({ classId, group: newGroup }));
    handleClose();
  };

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
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-600" />
                {t.addGroup}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.groupName}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t.groupName}
                />
              </div>

              {/* Days Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      {language === "ar" ? day.ar : day.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.time}
                </label>
                <div className="space-y-2">
                  {formData.time.map((time, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => handleTimeChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      {formData.time.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(index)}
                          className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTimeSlot}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    {t.addTime}
                  </button>
                </div>
              </div>

              {/* Maximum Students & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.maxStudents}
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={formData.maximumStudents}
                      onChange={(e) => setFormData(prev => ({ ...prev, maximumStudents: parseInt(e.target.value) || 0 }))}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.price}
                  </label>
                  <div className="relative">
                    <EgyptionPoundIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 w-[34px] h-[34px]" />
                    <input
                      type="number"
                      value={formData.groupPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, groupPrice: parseInt(e.target.value) || 0 }))}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Period & Start Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.paymentPeriod}
                  </label>
                  <select
                    value={formData.paymentPeriod}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentPeriod: e.target.value as "Daily" | "Monthly" }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Monthly">{t.monthly}</option>
                    <option value="Daily">{t.daily}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.startDate}
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.numberOfSessions}
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={formData.numberOfSessions}
                      onChange={(e) => setFormData(prev => ({ ...prev, numberOfSessions: parseInt(e.target.value) || 0 }))}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      min="1"
                    />
                  </div>
                </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.description}
                </label>
                <textarea
                  value={formData.groupDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, groupDescription: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                  placeholder={t.description}
                />
              </div>

  
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name.trim() || formData.day.length === 0}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition-colors disabled:cursor-not-allowed"
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

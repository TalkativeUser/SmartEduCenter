"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleModal } from "../../store/slices/uiSlice";
import { deleteGroupFromClass } from "@/store/slices/classesSlice";
import type { Group } from "@/types";
import { deleteGroup } from "@/lib/api/groups";
import { getCookie } from "@/lib/cookiesMethods";

interface DeleteGroupModalProps {
  isOpen: boolean;
  group: Group | undefined;
  classId: number | undefined;
}

const translations = {
  en: {
    deleteGroup: "Delete Group",
    confirmDelete: "Are you sure you want to delete this group?",
    warning: "This action cannot be undone. All group data will be permanently removed.",
    groupName: "Group Name",
    students: "Students",
    cancel: "Cancel",
    delete: "Delete Group",
    deleting: "Deleting...",
    errorDeleting: "Error deleting group",
  },
  ar: {
    deleteGroup: "حذف المجموعة",
    confirmDelete: "هل أنت متأكد من حذف هذه المجموعة؟",
    warning: "لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع بيانات المجموعة نهائياً.",
    groupName: "اسم المجموعة",
    students: "الطلاب",
    cancel: "إلغاء",
    delete: "حذف المجموعة",
    deleting: "جاري الحذف...",
    errorDeleting: "خطأ في حذف المجموعة",
  },
};

export default function DeleteGroupModal({ isOpen, group, classId }: DeleteGroupModalProps) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const t = translations[language as "en" | "ar"] || translations.en;
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    dispatch(toggleModal(null));
    setError(null);
  };

  const handleDelete = async () => {
    if (!group || !classId) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      const token = getCookie("teacherToken");
      if (!token) {
        setError("Authentication token not found");
        setIsDeleting(false);
        return;
      }

      if (!group.id) {
        setError("Group ID not found");
        setIsDeleting(false);
        return;
      }
      
      await deleteGroup(group.id);
      dispatch(deleteGroupFromClass({ classId, groupId: group.id }));
      handleClose();
    } catch (error: any) {
      console.error("Failed to delete group:", error);
      setError(error?.message || t.errorDeleting);
    } finally {
      setIsDeleting(false);
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
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                {t.deleteGroup}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer "
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    {t.confirmDelete}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.warning}
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.groupName}:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white font-semibold">
                      {group.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t.students}:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {group.maximum_students|| 0} / {group.maximum_students || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleClose}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-md transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.deleting}
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    {t.delete}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

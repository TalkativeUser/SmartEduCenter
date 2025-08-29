"use client";
import React from "react";
import { useAppSelector } from "@/hooks/redux";
import { motion } from "framer-motion";

interface ImodalProps {
  children: React.ReactNode;
}

export default function OverlayModals({ children }: ImodalProps) {
  const { modalIsOpen } = useAppSelector((state) => state.ui);

  if (!modalIsOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        {children}
      </div>
    </motion.div>
  );
}

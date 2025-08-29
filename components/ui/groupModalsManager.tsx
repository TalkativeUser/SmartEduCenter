"use client";
import React from "react";
import { useAppSelector } from "@/hooks/redux";
import AddGroupModal from "./addModalGroup";
import EditGroupModal from "./editModalGroup";
import DeleteGroupModal from "./deleteModalGroup";
import type { Group } from "@/store/slices/classesSlice";

interface GroupModalsManagerProps {
  groupSelected: Group | null;
  classSelected: number | null;
}

export default function GroupModalsManager({ groupSelected, classSelected }: GroupModalsManagerProps) {
  const { modalIsOpen, modalType } = useAppSelector((state) => state.ui);

  return (
    <>
      <AddGroupModal 
        isOpen={modalIsOpen && modalType === "addGroup"} 
        classId={classSelected}
      />
      <EditGroupModal 
        isOpen={modalIsOpen && modalType === "editGroup"} 
        group={groupSelected}
        classId={classSelected}
      />
      <DeleteGroupModal 
        isOpen={modalIsOpen && modalType === "deleteGroup"} 
        group={groupSelected}
        classId={classSelected}
      />
    </>
  );
}

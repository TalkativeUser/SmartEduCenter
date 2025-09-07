"use client";
import React from "react";
import { useAppSelector } from "@/hooks/redux";
import AddGroupModal from "./addModalGroup";
import EditGroupModal from "./editModalGroup";
import DeleteGroupModal from "./deleteModalGroup";
import type { Group } from "@/types";

interface GroupModalsManagerProps {
  groupSelected: Group | undefined;
  classSelected: number | undefined;
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

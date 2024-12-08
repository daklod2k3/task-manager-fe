"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import { FormAddUser } from "./FormAddUser";

export default function AddResource() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title=""
      triggerLabel="Add User"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormAddUser isLogin={false} />
    </ShowDialog>
  );
}

"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormAddRole from "./FormAddRole";

export default function AddRole() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Add a new role"
      triggerLabel="Add Role"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormAddRole onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

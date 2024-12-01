"use client";

import React, { useState } from "react";
import ShowDialog from "./ShowDialog";
import FormCreateDept from "./FormCreateDept";

export default function EditNameDept() {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
    };

    return (
    <ShowDialog
      title="Create a new department"
      triggerLabel="Create Department"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormCreateDept onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

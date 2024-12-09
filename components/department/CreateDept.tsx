"use client";

import React, { useState } from "react";
import ShowDialog from "./ShowDialog";
import FormCreateDept from "./FormCreateDept";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function CreateDepartment() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Create a new department"
      triggerLabel={<Button><Plus className="w-5 h-5"/>Create</Button>}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormCreateDept onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

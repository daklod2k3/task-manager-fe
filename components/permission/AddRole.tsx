"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormAddRole from "./FormAddRole";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function AddRole() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Add a new role"
      triggerLabel={<Button><Plus className="w-4 h-4"/>Add Role</Button>}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormAddRole onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

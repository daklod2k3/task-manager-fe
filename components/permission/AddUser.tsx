"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import { FormAddUser } from "./FormAddUser";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function AddResource() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title=""
      triggerLabel={<Button><Plus className="w-4 h-4"/>Add User</Button>}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormAddUser isLogin={false} />
    </ShowDialog>
  );
}

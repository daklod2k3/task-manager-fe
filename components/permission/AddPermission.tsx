"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormAddPermission from "./FormAddPermission";

export default function AddPermission({roleId}:{roleId:number}) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Add a new permission"
      triggerLabel="Add Permission"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormAddPermission roleId={roleId} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

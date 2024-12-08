"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormAddPermission from "./FormAddPermission";

export default function AddPermission({roleId,resoCurr}:{roleId:number,resoCurr:any[]}) {
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
      <FormAddPermission resoCurr={resoCurr} roleId={roleId} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

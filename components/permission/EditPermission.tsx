"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormEditPermission from "./FormEditPermission";

export default function EditPermission({mutate,id,view,create,update,del}:{mutate: () => void,id:number, view: boolean,create:boolean,update:boolean,del: boolean}) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Edit Permission"
      triggerLabel="Edit"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormEditPermission mutate={mutate} view={view} create={create} update={update} del={del} idPermission={id} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}
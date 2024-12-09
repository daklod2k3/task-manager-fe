"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormEditPermission from "./FormEditPermission";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

export default function EditPermission({id,view,create,update,del}:{id:number, view: boolean,create:boolean,update:boolean,del: boolean}) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Edit Permission"
      triggerLabel={<Button size="icon"><Pencil className="w-4 h-4"/></Button>}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormEditPermission view={view} create={create} update={update} del={del} idPermission={id} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

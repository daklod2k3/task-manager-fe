"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormEditResource from "./FormEditResource";
import { Button } from "../ui/button";

export default function EditResource({id,name,path}:{id:number,name:string,path:string}) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Edit resource"
      triggerLabel={<Button>Edit</Button>}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormEditResource name={name} path={path} idResource={id} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

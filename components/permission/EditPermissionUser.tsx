"use client";

import React, {useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormEditUser from "./FormEditUser";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";

export default function EditPermissionUser({id,name,bio,avt,role_id}:{id:string,
  name:string,bio:string,avt:string,role_id:number}) {
  const [open, setOpen] = useState(false);  

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title={"Edit Profile: " + name}
      triggerLabel={<Button size="icon"><Pencil className="w-4 h-4"/></Button>}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormEditUser avt={avt} bio={bio} name={name} role_id={role_id} userId={id} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

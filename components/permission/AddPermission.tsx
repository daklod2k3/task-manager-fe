"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormAddPermission from "./FormAddPermission";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function AddPermission({roleId,resoCurr}:{roleId:number,resoCurr:any[]}) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Add a new permission"
      triggerLabel={<Button><Plus className="w-4 h-4"/>Add Permission</Button>}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormAddPermission resoCurr={resoCurr} roleId={roleId} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

"use client";

import React, { useState } from "react";
import ShowDialog from "@/components/department/ShowDialog";
import FormAddResource from "./FormAddResource";
import { Button } from "../ui/button";

export default function AddResource() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Add a new resource"
      triggerLabel={<Button>add resoucre</Button>}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormAddResource onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

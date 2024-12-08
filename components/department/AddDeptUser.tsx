"use client";

import React, { useState } from "react";
import ShowDialog from "./ShowDialog";
import FormAddDeptUser from "./FormAddDeptUser";

type LoadOwnerProps = {
  mutate: () => void;
  idDept:number;
  nameDept:string;
  departmentUsers: any[];
};


const AddDeptUser: React.FC<LoadOwnerProps> = ({ mutate,departmentUsers,nameDept,idDept }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <ShowDialog
      title="Add Member For Department"
      triggerLabel="Add Member"
      className="w-full"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <FormAddDeptUser mutate={mutate} idDept={idDept} nameDept={nameDept} departmentUsers={departmentUsers} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

export default AddDeptUser;
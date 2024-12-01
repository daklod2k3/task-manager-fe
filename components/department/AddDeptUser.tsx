"use client";

import React, { useState } from "react";
import ShowDialog from "./ShowDialog";
import FormAddDeptUser from "./FormAddDeptUser";

type DepartmentUser = {
  id: number;
  created_at: string;
  department_id: number;
  owner_type: string;
  user_id: string;
};

type LoadOwnerProps = {
  idDept:number;
  nameDept:string;
  setDeptUser: React.Dispatch<React.SetStateAction<any[]>>;
  departmentUsers: DepartmentUser[];
};


const AddDeptUser: React.FC<LoadOwnerProps> = ({ departmentUsers,nameDept,idDept,setDeptUser }) => {
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
      <FormAddDeptUser setDeptUser={setDeptUser} idDept={idDept} nameDept={nameDept} departmentUsers={departmentUsers} onClose={() => setOpen(false)} />
    </ShowDialog>
  );
}

export default AddDeptUser;
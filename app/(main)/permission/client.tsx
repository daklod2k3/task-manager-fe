"use client";

import React, {useState} from "react";
import TablePermission from "@/components/permission/TablePermission";
import UserPermission from "@/components/permission/UserPermission";
import NavPermission from "@/components/permission/NavPermission";

export default function Decentralize() {
  const [currCate, setCurrCate] = useState("Role Management")

  const handleSwitch = (name:string) => {
    setCurrCate(name);
  }

  return (
    <div className="flex w-full h-screen">
      <NavPermission onSwitch={handleSwitch}/>
      {currCate == "Role Management" ? <TablePermission/> : <UserPermission/>}
    </div>
  );
}
"use client";

import React, {useEffect} from "react";
import { useDepartmentContext } from "@/context/department-context";
import TableDepartment from "@/components/department/TableDepartment";

export default function Department() {
  const { setMount } = useDepartmentContext();
  useEffect(() => {
    console.log("mount client")
  }, [setMount]);

  return (
    <TableDepartment/>
  );
}
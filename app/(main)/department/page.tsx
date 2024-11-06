import { DepartmentProvider } from "@/context/department-context";
import React from "react";
import Client from "./client";

export default function Page() {
  return (
    <DepartmentProvider >
      <Client />
    </DepartmentProvider>
  );
}
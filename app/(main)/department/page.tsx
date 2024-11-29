"use client";
import { DepartmentProvider } from "@/context/department-context";
import ClientDept from '@/components/department/ClientDept'

export default function Page() {
  return (
    <DepartmentProvider >
      <ClientDept />
    </DepartmentProvider>
  );
}
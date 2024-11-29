'use client'
import { DepartmentProvider } from "@/context/department-context";
import ClientDeptId from "@/components/department/ClientDeptId"

export default function pageId({ params }: { params: { id: number } }) {
  return (
    <DepartmentProvider>
      <ClientDeptId id={params.id}/>
    </DepartmentProvider>
  )
}
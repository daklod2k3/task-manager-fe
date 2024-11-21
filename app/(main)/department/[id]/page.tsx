"use client";

import React from 'react'
import DepartmentDetail from '@/components/department/DepartmentDetail'
import { DepartmentProvider } from "@/context/department-context";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <DepartmentProvider>
      <DepartmentDetail idDepartment={params.id}/>
    </DepartmentProvider>
  )
}

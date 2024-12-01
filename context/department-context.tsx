"use client";
import { createContext, useContext, ReactNode, useState } from "react";
import { useAllDepartment, useDepartment } from "@/hooks/use-department";
import { deleteDepartment, createDepartment, updateDepartment,updateName } from "@/action/Department";
import { useToast } from "@/hooks/use-toast";

interface IDepartmentContext {
  deptAllFetch: ReturnType<typeof useAllDepartment>;
  deptId: typeof useDepartment;
  deleteDept: typeof deleteDepartment;
  createDept: typeof createDepartment;
  updateDept: typeof updateDepartment;
  updateNameDept: typeof updateName;
  toast: ReturnType<typeof useToast>["toast"];
  mount: boolean;
  setMount: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DepartmentContext = createContext<IDepartmentContext | undefined>(undefined);

interface DepartmentProviderProps {
  children: ReactNode;
}

export function DepartmentProvider({ children }: DepartmentProviderProps) {
  const deptAllFetch = useAllDepartment();
  const deptId = useDepartment;
  const deleteDept = deleteDepartment;
  const createDept = createDepartment;
  const updateNameDept = updateName;
  const updateDept = updateDepartment;
  const {toast} = useToast();
  const [mount, setMount] = useState(false);

  const value = {
    deptAllFetch,
    deptId,
    deleteDept,
    createDept,
    updateDept,
    updateNameDept,
    toast,
    mount,
    setMount,
  };

  return <DepartmentContext.Provider value={value}>{children}</DepartmentContext.Provider>;
}

export function useDepartmentContext() {
  const context = useContext(DepartmentContext);
  if (!context) throw new Error("You must wrap with Department Provider");
  return context;
}
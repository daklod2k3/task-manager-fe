"use client";
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
  updateName,
} from "@/action/Department";
import { useDepartment } from "@/hooks/use-department";
import { useToast } from "@/hooks/use-toast";
import { createContext, ReactNode, useContext, useState } from "react";

interface IDepartmentContext {
  deptAllFetch: ReturnType<typeof useDepartment>;
  deptId: typeof useDepartment;
  deleteDept: typeof deleteDepartment;
  createDept: typeof createDepartment;
  updateDept: typeof updateDepartment;
  updateNameDept: typeof updateName;
  toast: ReturnType<typeof useToast>["toast"];
  deptDetail: any[];
  setDeptDetail: React.Dispatch<React.SetStateAction<any[]>>;
  mount: boolean;
  setMount: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DepartmentContext = createContext<IDepartmentContext | undefined>(
  undefined,
);

interface DepartmentProviderProps {
  children: ReactNode;
}

export function DepartmentProvider({ children }: DepartmentProviderProps) {
  const deptAllFetch = useDepartment({
    includes: "DepartmentUsers,TaskDepartments",
  });
  const deptId = useDepartment;
  const deleteDept = deleteDepartment;
  const createDept = createDepartment;
  const updateNameDept = updateName;
  const updateDept = updateDepartment;
  const [deptDetail, setDeptDetail] = useState<any[]>([]);
  const { toast } = useToast();
  const [mount, setMount] = useState(false);
  
  const value = {
    deptAllFetch,
    deptId,
    deleteDept,
    createDept,
    updateDept,
    updateNameDept,
    deptDetail,
    setDeptDetail,
    toast,
    mount,
    setMount,
  };

  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
}

export function useDepartmentContext() {
  const context = useContext(DepartmentContext);
  if (!context) throw new Error("You must wrap with Department Provider");
  return context;
}

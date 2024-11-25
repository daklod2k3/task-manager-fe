"use client"; 
import { createContext, useContext, ReactNode, useState } from "react";
import {useAllDepartment} from "@/hooks/use-department";

interface IDepartmentContext {
  departmentAllFetch: ReturnType<typeof useAllDepartment>;
  mount: boolean;
  setMount: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DepartmentContext = createContext<IDepartmentContext | undefined>(undefined);

interface DepartmentProviderProps {
  children: ReactNode;
}

export function DepartmentProvider({ children }: DepartmentProviderProps) {
  const departmentAllFetch = useAllDepartment();
  const [mount, setMount] = useState(false);
  
  console.log(departmentAllFetch.data);
  const value = {
    departmentAllFetch,
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
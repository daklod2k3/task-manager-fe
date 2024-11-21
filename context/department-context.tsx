"use client"; 
import { createContext, useContext, ReactNode, useState } from "react";
import {useDepartment} from "@/hooks/use-department";

interface IDepartmentContext {
  departmentFetch: ReturnType<typeof useDepartment>;
  mount: boolean;
  setMount: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DepartmentContext = createContext<IDepartmentContext | undefined>(undefined);

interface DepartmentProviderProps {
  children: ReactNode;
}

export function DepartmentProvider({ children }: DepartmentProviderProps) {
  const departmentFetch = useDepartment();
  const [mount, setMount] = useState(false);
  
  console.log(departmentFetch.data);
  const value = {
    departmentFetch,
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
"use client"; 
import { createContext, useContext, ReactNode } from "react";
import useDepartment from "@/hooks/use-department";

interface IDepartmentContext {
  departmentFetch: ReturnType<typeof useDepartment>;
}

export const DepartmentContext = createContext<IDepartmentContext | undefined>(undefined);

interface DepartmentProviderProps {
  children: ReactNode;
}

export function DepartmentProvider({ children }: DepartmentProviderProps) {
  const departmentFetch = useDepartment();
  
  const value = {
    departmentFetch,
  };

  return <DepartmentContext.Provider value={value}>{children}</DepartmentContext.Provider>;
}

export function useDepartmentContext() {
  const context = useContext(DepartmentContext);
  if (!context) throw new Error("You must wrap with Department Provider");
  return context;
}
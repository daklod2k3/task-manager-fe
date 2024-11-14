"use client"; 
import { createContext, useContext, ReactNode, useState } from "react";
import useDepartment from "@/hooks/use-department";
import useDepartmentUser from "@/hooks/use-departmentUser";
import useProfile from "@/hooks/use-profile";

interface IDepartmentContext {
  departmentFetch: ReturnType<typeof useDepartment>;
  departmentUserFetch: ReturnType<typeof useDepartmentUser>;
  userFetch: ReturnType<typeof useProfile>;
  mount: boolean;
  setMount: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DepartmentContext = createContext<IDepartmentContext | undefined>(undefined);

interface DepartmentProviderProps {
  children: ReactNode;
}

export function DepartmentProvider({ children }: DepartmentProviderProps) {
  const departmentFetch = useDepartment();
  const departmentUserFetch = useDepartmentUser();
  const userFetch = useProfile();
  const [mount, setMount] = useState(false);

  console.log(userFetch.data)
  
  const value = {
    departmentFetch,
    departmentUserFetch,
    userFetch,
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
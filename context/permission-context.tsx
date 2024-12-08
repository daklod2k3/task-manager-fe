"use client";
import {
  deleteResource,
  addPermission,
  deleteRole,
  deletePermission,
  addResource,
  addRole,
  updatePermission,
  updateResource,
} from "@/action/Permission";
import { useResource,useRole } from "@/hooks/use-permission";
import { useToast } from "@/hooks/use-toast";
import { createContext, ReactNode, useContext, useState } from "react";

interface IPermissionContext {
  resourceFetch: ReturnType<typeof useResource>;
  roleFetch: ReturnType<typeof useRole>;
  delRole: typeof deleteRole;
  delPermission: typeof deletePermission;
  delResource: typeof deleteResource;
  addPerm: typeof addPermission;
  addReso: typeof addResource;
  addRol: typeof addRole;
  updatePerm: typeof updatePermission;
  updateReso: typeof updateResource;
  toast: ReturnType<typeof useToast>["toast"];
  role: number;
  setRole: React.Dispatch<React.SetStateAction<number>>;
}

export const PermissionContext = createContext<IPermissionContext | undefined>(
  undefined,
);

interface PermissionProviderProps {
  children: ReactNode;
}

export function PermissionProvider({ children }: PermissionProviderProps) {
  const { toast } = useToast();
  const resourceFetch = useResource({
    includes: "Permissions",
  });
  const roleFetch = useRole({
    includes: "Permissions",
  });
  const delRole = deleteRole;
  const delPermission = deletePermission;
  const delResource = deleteResource;
  const addPerm = addPermission;
  const addReso = addResource;
  const addRol = addRole;
  const updatePerm = updatePermission;
  const updateReso = updateResource;
  const [role, setRole] = useState<number>(1);

  const value = {
    resourceFetch,
    roleFetch,
    delPermission,
    delResource,
    addPerm,
    delRole,
    addReso,
    addRol,
    updatePerm,
    updateReso,
    toast,
    role,
    setRole,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (!context) throw new Error("You must wrap with Permission Provider");
  return context;
}

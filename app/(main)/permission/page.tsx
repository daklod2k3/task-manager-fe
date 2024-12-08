import React from "react";
import ClientPermission from "@/components/permission/clientPermission";
import { PermissionProvider } from "@/context/permission-context";

export default function Page() {
    return (
        <PermissionProvider>
            <ClientPermission />
        </PermissionProvider>
    );
}
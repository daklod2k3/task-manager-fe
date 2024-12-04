"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRole, useResource } from "@/hooks/use-permission"
import { useEffect, useState } from "react"
import AddRole from "./AddRole"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { deletePermission, deleteRole } from "@/action/Permission"
import AlertButton from "../department/AlertButton"
import { Trash2 } from 'lucide-react'
import AddPermission from "./AddPermission"


export default function TablePermission() {
  const {data:resourceFetch, isLoading:loadResource, mutate:mutateResource} = useResource();
  const {data:roleFetch, isLoading:loadRole, mutate:mutateRole} = useRole();
  const [roleData, setRoleData] = useState<any[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<any[]>([]);
  const [role, setRole] = useState<number>(0);
  const {toast} = useToast();

  useEffect(() => {
    if(resourceFetch) {
      const filteredPermissions = resourceFetch.map((resource) => ({
        ...resource,
        permissions: resource.permissions.filter((perm) => perm.role_id === role),
      })).filter((resource) => resource.permissions.length > 0);
      console.log(filteredPermissions)
      setSelectedPermission(filteredPermissions)
    }
  }, [resourceFetch,role])

  useEffect(() => {
    if(roleFetch) {
      setRoleData(roleFetch)
    }
  }, [roleFetch])

  const handleValueSelect = (id:number) => {

  }

  const deleteRoleById = async (id: number) => {
    try {
      const res = await deleteRole(id);
      mutateRole()
      console.log(res)
      toast({
        description: "Deleted department successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      });
    }
  };

  const deletePermissionById = async (id: number) => {
    try {
      const res = await deletePermission(id);
      mutateResource()
      console.log(res)
      toast({
        description: "Deleted department successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      });
    }
  };

  return (
    <Card className="w-full border-0">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl mb-2">Role Management</CardTitle>
        <div className="flex items-center space-x-2">
          <Select onValueChange={(value) => {setRole(Number(value))}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="admin" />
            </SelectTrigger>
            <SelectContent>
              {roleData.map(role => (
                <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AddRole/>
          <AddPermission roleId={role}/>
          <AlertButton 
              confirmButtonLabel="Delete Role" 
              title={`Do you want to delete Role id ${role}?`}
              onAction={() => {
                deleteRoleById(role)
              }}
            >
              <Button>
                Delete Role
              </Button>
            </AlertButton>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="px-4 py-2 text-left">Permissions</TableHead>
              <TableHead className="px-4 py-2 text-left">Resource</TableHead>
              <TableHead className="px-4 py-2 text-center">View</TableHead>
              <TableHead className="px-4 py-2 text-center">Edit</TableHead>
              <TableHead className="px-4 py-2 text-center">Add</TableHead>
              <TableHead className="px-4 py-2 text-center">Delete</TableHead>
              <TableHead className="px-4 py-2 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedPermission.map((permission, index) => (
              <TableRow key={index} className="border-b last:border-b-0 hover:bg-muted/10">
                <TableCell className="px-4 py-2">{permission.name}</TableCell>
                <TableCell className="px-4 py-2">{permission.path}</TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox defaultChecked={permission.permissions[0].view} disabled/>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox defaultChecked={permission.permissions[0].update} disabled/>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox defaultChecked={permission.permissions[0].create} disabled/>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox defaultChecked={permission.permissions[0].delete} disabled/>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                <AlertButton 
                  confirmButtonLabel="Delete Permission" 
                  title={`Do you want to delete Permission id ${permission.permissions[0].id}?`}
                  onAction={() => {deletePermissionById(permission.permissions[0].id)}}
                >
                  <Button>
                    Delete
                  </Button>
                </AlertButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Loading from "../Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePermissionContext } from "@/context/permission-context"
import {DescriptionCustom} from "@/components/department/CustomToast"
import AddRole from "./AddRole"
import AlertButton from "../department/AlertButton"
import AddPermission from "./AddPermission"
import EditPermission from "./EditPermission"
import { Trash2 } from "lucide-react"


export default function TablePermission() {
  const {
    toast,
    delRole,
    roleFetch,
    resourceFetch,
    delPermission
  } =  usePermissionContext();
  const [roleData, setRoleData] = useState<any[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<any[]>([]);
  const [role, setRole] = useState<number>();

  useEffect(() => {
    if(resourceFetch.data) {
      const filteredPermissions = resourceFetch.data.map((resource) => ({
        ...resource,
        permissions: resource.permissions.filter((perm) => perm.role_id === role),
      })).filter((resource) => resource.permissions.length > 0);
      setSelectedPermission(filteredPermissions)
    }
  }, [resourceFetch.data,role])

  useEffect(() => {
    if(roleFetch.data) {
      console.log(roleFetch.data)
      setRoleData(roleFetch.data)
      setRole(roleFetch.data[0].id)
    }
  }, [roleFetch.data])

  const deleteRoleById = async (id: number) => {
    try {
      const res = await delRole(id);
      roleFetch.mutate()
      console.log(res)
      toast({
        title: "Success",
        description: <DescriptionCustom>{"Deleted Role"}</DescriptionCustom>
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Error",
        description: String(error),
      });
    }
  };

  const deletePermissionById = async (id: number) => {
    try {
      const res = await delPermission(id);
      resourceFetch.mutate()
      console.log(res)
      toast({
        title: "Success",
        description: <DescriptionCustom>{"Deleted Permission"}</DescriptionCustom>
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Error",
        description: String(error),
      });
    }
  };

  return (
    <Card className="w-full border-0">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-primary mb-2">Role Management</CardTitle>
        <div className="flex w-full justify-between space-x-2">
          <Select onValueChange={(value) => {setRole(Number(value))}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={roleData[0]?.name || "loading..."} />
            </SelectTrigger>
            <SelectContent>
            {roleData
              .filter((role) => role.id !== 0)
              .map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <AddRole/>
            <AddPermission resoCurr={selectedPermission} roleId={role || 1}/>
            <AlertButton 
                confirmButtonLabel="Delete Role" 
                title={`Do you want to delete Role id ${role}?`}
                onAction={() => {
                  setRole(prev => prev)
                  deleteRoleById(role || 1)
                }}
              >
                <Button>
                  Delete Role
                </Button>
              </AlertButton>
          </div>
        </div>
      </CardHeader>
      <CardContent>
      {resourceFetch.isLoading ? <Loading /> : 
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="px-4 py-2 text-left">Permissions</TableHead>
              <TableHead className="px-4 py-2 text-left">Resource</TableHead>
              <TableHead className="px-4 py-2 text-center">View</TableHead>
              <TableHead className="px-4 py-2 text-center">Create</TableHead>
              <TableHead className="px-4 py-2 text-center">Update</TableHead>
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
                  <Checkbox checked={permission.permissions[0].view} disabled/>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox checked={permission.permissions[0].create} disabled/>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox checked={permission.permissions[0].update} disabled/>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox checked={permission.permissions[0].delete} disabled/>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <EditPermission
                    view={permission.permissions[0].view} 
                    update={permission.permissions[0].update}
                    create={permission.permissions[0].create}
                    del={permission.permissions[0].delete}
                    id={permission.permissions[0].id} 
                  />
                <AlertButton 
                  confirmButtonLabel="Delete Permission" 
                  title={`Do you want to delete Permission id ${permission.permissions[0].id}?`}
                  onAction={() => {deletePermissionById(permission.permissions[0].id)}}
                >
                  <Button className="ml-2" size="icon">
                    <Trash2 className="w-4 h-4"/>
                  </Button>
                </AlertButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
      </CardContent>
    </Card>
  )
}
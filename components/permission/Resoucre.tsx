"use client";

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { usePermissionContext } from "@/context/permission-context";
import { ScrollArea } from "@/components/ui/scroll-area"
import AddResource from "./AddResource";
import EditResource from "./EditResource";
import AlertButton from "../department/AlertButton"
import {DescriptionCustom} from "@/components/department/CustomToast"

export default function Resource() {
  const {resourceFetch,toast,delResource} =  usePermissionContext();
  const [resource, setResource] = useState<any[]>([]);

  useEffect(() => {
    if(resourceFetch.data) {
      setResource(resourceFetch.data)
    }
  }, [resourceFetch.data])

  const deleteResourceById = async (id: number) => {
    try {
      const res = await delResource(id);
      console.log(res)
      resourceFetch.mutate();
      toast({
        title: "Success",
        description: <DescriptionCustom>{"Deleted Resource"}</DescriptionCustom>
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
    <div className="w-full p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Resource</h1>
        <AddResource/>
      </div>
      <ScrollArea className="max-h-[80vh] h-[800px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Path</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resource.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.id}</TableCell>
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.path}</TableCell>
                <TableCell>
                  <div className="w-full flex justify-center">
                    <EditResource path={resource.path} name={resource.name} id={resource.id} />
                    <AlertButton 
                      confirmButtonLabel="Delete Resource" 
                      title={`Do you want to delete Resource id ${resource.id}?`}
                      onAction={() => {deleteResourceById(resource.id)}}
                    >
                      <Button className="ml-2">
                        Delete
                      </Button>
                    </AlertButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
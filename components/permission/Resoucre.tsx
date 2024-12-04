"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useRole, useResource } from "@/hooks/use-permission"
import AddResource from "./AddResource";
import EditResource from "./EditResource";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { deleteResource } from "@/action/Permission";
import AlertButton from "../department/AlertButton"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Resource() {
  const {data:resourceFetch, isLoading:loadResource,mutate} = useResource();
  const [resource, setResource] = useState<any[]>([]);
  const {toast} = useToast();

  useEffect(() => {
    if(resourceFetch) {
      setResource(resourceFetch)
    }
  }, [resourceFetch])

  const deleteResourceById = async (id: number) => {
    try {
      const res = await deleteResource(id);
      console.log(res)
      mutate();
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
    // <div className="w-full p-4">
    //   <div>
    //     <h1 className="text-primary text-2xl mb-4">Resource</h1>
    //   </div>
    //   <div className="space-y-4">
    //     <div className="flex flex-wrap items-center gap-4">
    //       <AddResource/>
    //     </div>
    //     <div className="overflow-x-auto">
    //       <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead>ID</TableHead>
    //             <TableHead>Name</TableHead>
    //             <TableHead>Path</TableHead>
    //             <TableHead>Actions</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <ScrollArea>
    //           <TableBody>
    //             {resource.map((resource) => {
    //               return (
    //                 <TableRow key={resource.id}>
    //                   <TableCell>{resource.id}</TableCell>
    //                   <TableCell>{resource.name}</TableCell>
    //                   <TableCell>{resource.path}</TableCell>
                      // <TableCell>
                      //     <EditResource path={resource.path} name={resource.name} id={resource.id} />
                      //     <AlertButton 
                      //       confirmButtonLabel="Delete Resource" 
                      //       title={`Do you want to delete Resource id ${resource.id}?`}
                      //       onAction={() => {deleteResourceById(resource.id)}}
                      //     >
                      //       <Button className="ml-2">
                      //         Delete
                      //       </Button>
                      //     </AlertButton>
                      //   </TableCell>
    //                 </TableRow>
    //               );
    //             })}
    //           </TableBody>
    //         </ScrollArea>
    //       </Table>
    //     </div>
    //   </div>
    // </div>
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
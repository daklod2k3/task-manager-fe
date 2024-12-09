'use client'

import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { KeyRound, Trash2,Pencil } from 'lucide-react'
import { usePeople } from "@/hooks/use-people"
import { useEffect, useState } from "react"
import { Tables } from "@/entity/database.types"
import { useToast } from "@/hooks/use-toast";
import MyAvatar from "../Avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import AddUser from "./AddUser"
import AlertButton from "../department/AlertButton"
import { deleteUser } from "@/action/User"
import EditPermissionUser from "./EditPermissionUser"
import { usePermissionContext } from "@/context/permission-context"

export default function UserTable() {
  const {data:peopleFetch, isLoading,mutate,} = usePeople({});
  const [peoples, setPeoples] = useState<Tables<"profiles">[]>([]);
  const {toast,roleFetch} =  usePermissionContext();
  const [roleData, setRoleData] = useState<any[]>([])

  useEffect(() => {
    if(peopleFetch) {
      console.log(peopleFetch)
      setPeoples(peopleFetch);
    }
  }, [peopleFetch]);

  useEffect(() => {
    if(roleFetch.data) {
      console.log(roleFetch.data)
      setRoleData(roleFetch.data);
    }
  }, [roleFetch.data]);

  const deleteUserById = async (id: string) => {
    try {
      const res = await deleteUser(id);
      mutate()
      console.log(res)
      toast({
        description: "Deleted department successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete department error",
        description: String(error),
      });
    }
  };

  return (
    // <div className="w-full p-4">
    //   <div className="flex items-center justify-between mb-4">
    //     <div className="flex items-center gap-2">
    //       <h1 className="text-xl font-semibold">All Users</h1>
    //       <Badge variant="secondary" className="rounded-full">{peoples.length}</Badge>
    //     </div>
    //     <Button>+ Add New User</Button>
    //   </div>
    //   <div className="border rounded-lg">
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-12">
    //             <Checkbox />
    //           </TableHead>
              // <TableHead>NAME</TableHead>
              // <TableHead>ROLE</TableHead>
              // <TableHead>BIO</TableHead>
              // <TableHead>ACTIONS</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {peoples.map((user) => (
    //           <TableRow key={user.id}>
    //             <TableCell>
    //               <Checkbox />
    //             </TableCell>
    //             <TableCell>
    //               <div className="flex items-center gap-3">
    //                 <MyAvatar user={user}/>
    //                 <div className="flex flex-col">
    //                   <span className="font-medium">{user.name}</span>
    //                 </div>
    //               </div>
    //             </TableCell>
    //             <TableCell>
    //               <Badge 
    //                 variant={user.role_id === "1" ? 'secondary' : 'outline'}
    //                 className="font-normal"
    //               >
    //                 {user.role_id == "1" ? "User" : "Admin"}
    //               </Badge>
    //             </TableCell>
    //             <TableCell>
    //                 <span className="text-sm">{user.bio || "không có"}</span>
    //             </TableCell>
    //             <TableCell>
    //               <div className="flex items-center gap-2">
    //                 <Button size="icon">
    //                   <KeyRound className="w-4 h-4" />
    //                 </Button>
    //                 <Button size="icon">
    //                   <Trash2 className="w-4 h-4" />
    //                 </Button>
    //                 <Button size="icon">
    //                   <Pencil className="w-4 h-4"/>
    //                 </Button>
    //               </div>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </div>
    // </div>
    <div className="w-full p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary flex items-center">All Users 
          <Badge variant="secondary" className="ml-2 rounded-full">{peoples.length}</Badge>
        </h1>
        <AddUser/>
      </div>
      <ScrollArea className="max-h-[80vh] h-[800px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>BIO</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peoples.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <span>{user.id}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MyAvatar user={user}/>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.role_id === "1" ? 'secondary' : 'outline'}
                    className="font-normal"
                  >
                    <span className="capitalize">{roleFetch.isLoading ? "loading..." : roleData.find((role) => role.id === user.role_id)?.name}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                    <span className="text-sm">{user.bio || "không có"}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <AlertButton 
                      title="Delete"
                      onAction={() => {deleteUserById(user.id)}}
                      ><Button size="icon">
                        <Trash2 className="w-4 h-4"/>
                        </Button>
                        </AlertButton>
                        <EditPermissionUser avt={user.avt || ""} bio={user.bio || ""} name={user.name} role_id={Number(user.role_id)} id={user.id}/>
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
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
import MyAvatar from "../Avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import AddResource from "./AddResource"

export default function UserTable() {
  const {data:peopleFetch, isLoading} = usePeople();
  const [peoples, setPeoples] = useState<Tables<"profiles">[]>([]);

  useEffect(() => {
    if(peopleFetch) {
      console.log(peopleFetch)
      setPeoples(peopleFetch);
    }
  }, [peopleFetch]);

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
        <AddResource/>
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
                    {user.role_id == "1" ? "User" : "Admin"}
                  </Badge>
                </TableCell>
                <TableCell>
                    <span className="text-sm">{user.bio || "không có"}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* <Button size="icon">
                      <KeyRound className="w-4 h-4" />
                    </Button> */}
                    <Button size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button size="icon">
                      <Pencil className="w-4 h-4"/>
                    </Button>
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
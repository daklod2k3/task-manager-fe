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

interface User {
  id: string
  name: string
  email: string
  role: 'Super Admin' | 'Admin' | 'Contributor'
  groups: string[]
  status: 'Active' | 'Inactive'
  avatarUrl: string
}

const users: User[] = [
  {
    id: '1',
    name: 'Ian Chesnut',
    email: 'ian.chesnut@gmail.com',
    role: 'Super Admin',
    groups: ['Falcons', 'Stallions'],
    status: 'Active',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Zeki Mokharzada',
    email: 'zeki@gmail.com',
    role: 'Admin',
    groups: ['Falcons', 'Stallions'],
    status: 'Inactive',
    avatarUrl: '/placeholder.svg'
  },
  // Add more users as needed
]

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
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">All Users</h1>
          <Badge variant="secondary" className="rounded-full">{peoples.length}</Badge>
        </div>
        <Button>+ Add New User</Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
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
                  <Checkbox />
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
                    <Button size="icon">
                      <KeyRound className="w-4 h-4" />
                    </Button>
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
      </div>
      {/* <div className="flex items-center justify-between px-2 py-4">
        <Button variant="ghost" disabled>
          Prev
        </Button>
        <div className="flex items-center gap-1">
          <Button size="icon" className="w-8 h-8">
            1
          </Button>
          {[2, 3, 4, 5].map((page) => (
            <Button key={page} variant="ghost" size="icon" className="w-8 h-8">
              {page}
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="w-8 h-8">
            Next
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing 10 of 127
        </div>
      </div> */}
    </div>
  )
}
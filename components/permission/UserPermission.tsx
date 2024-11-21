import { useEffect,useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Home, Plus, Settings } from 'lucide-react'
import { usePeople } from "@/hooks/use-people"
import { Tables } from "@/entity/database.types"
import Avatar from "@/components/Avatar"

export default function UserPermission() {
  const userFetch = usePeople();
  const [users, setUsers] = useState<Tables<"profiles">[]>([]);

  useEffect(() => {
    if (userFetch.data) {
      console.log(userFetch.data)
      setUsers(userFetch.data);
    }
  }, [userFetch.data]);

  return (
    <div className="w-full">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Administrator</h1>
        </div>
      </header>
      <div className="p-4">
        <div className="flex items-center mb-4">
          {/* <div className="flex items-center gap-2">
            Show
            <Select defaultValue="10">
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Entries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            entries
          </div> */}
          <div className="flex items-center gap-2">
            Search:
            <Input type="search" className="w-64" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Input type="checkbox" className="h-4 w-4" />
              </TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Fullname</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, idx) => (
              idx <= 7 && (
              <TableRow key={user.id}>
                <TableCell>
                  <Input type="checkbox" className="h-4 w-4" />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Avatar />
                </TableCell>
                <TableCell>{user.bio || "không có"}</TableCell>
                <TableCell>user</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm">
                      Chỉnh sửa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing 1 to 7 of 1 entries
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button size="sm">
              1
            </Button>
            <Button size="sm">
              2
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
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


export default function TablePermission() {
  const permissions = [
    { name: "Quản lý nhiệm vụ", canView: true, canEdit: true, canCreate: true, canDelete: true },
    { name: "Gán nhiệm vụ", canView: true, canEdit: true, canCreate: false, canDelete: false },
    { name: "Xóa nhiệm vụ", canView: true, canEdit: false, canCreate: false, canDelete: true },
    { name: "Quản lý thành viên", canView: true, canEdit: true, canCreate: true, canDelete: true },
    { name: "Quản lý chat", canView: true, canEdit: true, canCreate: true, canDelete: true },
    { name: "Quản lý thông báo", canView: true, canEdit: false, canCreate: false, canDelete: false },
    { name: "Quản lý báo cáo", canView: true, canEdit: false, canCreate: false, canDelete: false },
    { name: "Quản lý quyền", canView: true, canEdit: false, canCreate: false, canDelete: false },
    { name: "thêm quyền", canView: true, canEdit: false, canCreate: false, canDelete: false },
    { name: "thêm chức vụ", canView: true, canEdit: false, canCreate: false, canDelete: false },
  ];

  return (
    <Card className="w-full border-0">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl mb-2">Role Management</CardTitle>
        <div className="flex items-center space-x-2">
          <Select defaultValue="admin">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">admin</SelectItem>
              <SelectItem value="user">user</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add Role</Button>
          <Button>Add Permission</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="px-4 py-2 text-left">Permissions</TableHead>
              <TableHead className="px-4 py-2 text-center">Xem</TableHead>
              <TableHead className="px-4 py-2 text-center">Sửa</TableHead>
              <TableHead className="px-4 py-2 text-center">Thêm</TableHead>
              <TableHead className="px-4 py-2 text-center">Xóa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission, index) => (
              <TableRow key={index} className="border-b last:border-b-0 hover:bg-muted/10">
                <TableCell className="px-4 py-2">{permission.name}</TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox defaultChecked={permission.canView} />
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox defaultChecked={permission.canEdit} />
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox defaultChecked={permission.canCreate} />
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Checkbox defaultChecked={permission.canDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline">Xóa</Button>
          <Button>Lưu</Button>
        </div>
      </CardContent>
    </Card>
  )
}
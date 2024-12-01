"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Layers, Users, Settings, FileText, Folder, Shield } from 'lucide-react'

const categoryIcons = {
  'Dashboard': Layers,
  'Users': Users,
  'Settings': Settings,
  'Content': FileText,
  'Files': Folder,
  'Security': Shield,
}

const categoryColors = {
  'Dashboard': 'bg-blue-100 text-blue-800',
  'Users': 'bg-green-100 text-green-800',
  'Settings': 'bg-purple-100 text-purple-800',
  'Content': 'bg-yellow-100 text-yellow-800',
  'Files': 'bg-orange-100 text-orange-800',
  'Security': 'bg-red-100 text-red-800',
}

export default function Resource() {
  const resources = [
    { id: 1, name: 'Dashboard', path: '/dashboard', permissions: ['view', 'edit'], category: 'Dashboard' },
    { id: 2, name: 'Users', path: '/users', permissions: ['view', 'create', 'edit', 'delete'], category: 'Users' },
    { id: 3, name: 'Settings', path: '/settings', permissions: ['view', 'edit'], category: 'Settings' },
    { id: 4, name: 'Blog Posts', path: '/posts', permissions: ['view', 'create', 'edit', 'delete'], category: 'Content' },
    { id: 5, name: 'File Manager', path: '/files', permissions: ['view', 'upload', 'download', 'delete'], category: 'Files' },
    { id: 6, name: 'Roles', path: '/roles', permissions: ['view', 'create', 'edit', 'delete'], category: 'Security' },
  ]

  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle className="text-primary text-2xl">Resource</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Add Resource</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => {
                const IconComponent = categoryIcons[resource.category]
                return (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.id}</TableCell>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>{resource.path}</TableCell>
                    <TableCell>
                      {resource.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="mr-1">
                          {permission}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge 
                          variant="secondary" 
                          className={`flex items-center ${categoryColors[resource.category]}`}
                        >
                          {IconComponent && <IconComponent className="mr-1 h-4 w-4" />}
                          {resource.category}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
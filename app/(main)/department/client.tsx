'use client'

import { useState } from 'react'
import { DepartmentList } from '@/components/department/DepartmentList'
import { AddDepartmentModal } from '@/components/department/AddDepartmentModal'
import { Input } from "@/components/ui/input"
import { Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CreateDepartment from '@/components/department/CreateDepartment'

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [departments, setDepartments] = useState([
    { id: 101, name: 'Human Resources', owner: 'John Doe', members: 15, tasksCompleted: 45, totalTasks: 50 },
    { id: 202, name: 'Marketing', owner: 'Jane Smith', members: 20, tasksCompleted: 30, totalTasks: 40 },
    { id: 303, name: 'Engineering', owner: 'Bob Johnson', members: 50, tasksCompleted: 80, totalTasks: 100 },
    { id: 404, name: 'Finance', owner: 'Alice Brown', members: 10, tasksCompleted: 25, totalTasks: 30 },
    { id: 505, name: 'Customer Support', owner: 'Charlie Davis', members: 30, tasksCompleted: 60, totalTasks: 75 },
    { id: 606, name: 'Product Development', owner: 'Eva White', members: 40, tasksCompleted: 70, totalTasks: 90 },
    { id: 707, name: 'Legal', owner: 'Frank Green', members: 5, tasksCompleted: 15, totalTasks: 20 },
    { id: 808, name: 'Sales', owner: 'Grace Lee', members: 25, tasksCompleted: 40, totalTasks: 50 },
  ])

  const handleAddDepartment = (newDepartment) => {
    setDepartments([...departments, { ...newDepartment, id: Date.now() }])
  }

  return (
    <div className="w-full p-4">
      <h1 className="text-4xl font-bold mb-10 text-primary">Department Management</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            aria-label="Search departments"
          />
        </div>
        <CreateDepartment/>
        </div>
      <DepartmentList searchTerm={searchTerm} departments={departments} setDepartments={setDepartments} />
    </div>
  )
}
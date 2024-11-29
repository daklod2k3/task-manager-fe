'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { DepartmentList } from '@/components/department/DepartmentList'
import CreateDept from './CreateDept'

export default function ClientDept() {
  const [searchTerm, setSearchTerm] = useState('')

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
        <CreateDept/>
        </div>
      <DepartmentList searchTerm={searchTerm} />
    </div>
  )
}
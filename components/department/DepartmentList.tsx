'use client'

import { useEffect,useMemo,useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Users, Briefcase } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDepartmentContext } from "@/context/department-context"

interface Department {
  id: number
  name: string
  owner: string
  members: number
  tasksCompleted: number
  totalTasks: number
}

interface DepartmentListProps {
  searchTerm: string
  departments: Department[]
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>
}

export function DepartmentList({ searchTerm, departments, setDepartments }: DepartmentListProps) {
  // const { departmentAllFetch } = useDepartmentContext()
  // const [depa, setDepa] = useState<any[]>([])

  // useEffect(() => {
  //   if (departmentAllFetch.data) {
  //     setDepa(departmentAllFetch.data)
  //   }
  // }, [departmentAllFetch.data])

  const filteredDepartments = useMemo(() => {
    return departments.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.owner.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [departments, searchTerm])

  const handleDelete = (id: number) => {
    setDepartments(departments.filter(dept => dept.id !== id))
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full bg-pink-50/80 p-6 rounded-xl shadow-lg">
      <ScrollArea className="h-[640px] px-2">
        {filteredDepartments.length === 0 ? (
          <p className="text-center text-muted-foreground">No departments found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDepartments.map(dept => (
              <Link 
                key={dept.id}
                href={`/department/${dept.id}`}
                className="block group"
              >
                <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500 hover:border-green-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-xl text-pink-700 group-hover:text-pink-800">
                      {dept.name}
                    </h3>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-pink-50"
                        onClick={(e) => {
                          e.preventDefault()
                          // Edit functionality
                        }}
                        aria-label={`Edit ${dept.name}`}
                      >
                        <Pencil className="h-4 w-4 text-pink-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-pink-50" 
                        onClick={(e) => {
                          e.preventDefault()
                          // Delete functionality
                        }}
                        aria-label={`Delete ${dept.name}`}
                      >
                        <Trash2 className="h-4 w-4 text-pink-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Owner:</span>
                      <span className="text-gray-800">owner</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{dept.members} members</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2 text-pink-500" />
                      <span>{dept.tasksCompleted}/{dept.totalTasks} tasks</span>
                    </div>
                    <div className="flex items-center text-gray-800 font-medium">
                    {((dept.tasksCompleted / dept.totalTasks) * 100).toFixed(0)}% Complete
                    </div>
                  </div>
                  <Progress 
                        value={(dept.tasksCompleted / dept.totalTasks) * 100} 
                        className="h-2"
                        aria-label={`${dept.name} task completion`}
                      />
                </div>
              </Link>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
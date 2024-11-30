'use client'

import Link from 'next/link'
import { useEffect,useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Users, Briefcase } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDepartmentContext } from "@/context/department-context"
import LoadOwner from './LoadPeople'
import LoadTask from './LoadTask'
import AlertButton from '@/components/department/AlertButton'
import { ToastAction } from '../ui/toast'
import Loading from '../Loading'



export function DepartmentList({ searchTerm }: {searchTerm:string}) {
  const { deptAllFetch,toast,deleteDept } = useDepartmentContext()
  const [depa, setDepa] = useState<any[]>([])

  useEffect(() => {
    if (deptAllFetch.data) {
      setDepa(deptAllFetch.data)
    }
  }, [deptAllFetch.data])

  const filteredDepartments = useMemo(() => {
    return depa.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [depa, searchTerm])

  const deleteDepaById = async (id: number) => {
    try {
      const res = await deleteDept(id);
      console.log(res)
      toast({
        description: "Deleted department successfully",
      });
      deptAllFetch.mutate();
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
    <div className="w-full bg-pink-50/80 p-6 rounded-xl shadow-lg">
      {deptAllFetch.isLoading ? 
      <Loading/> : 
      <ScrollArea className="h-[640px] px-2">
      {depa.length === 0 ? (
        <p className="text-center text-muted-foreground">No departments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDepartments.map(dept => (
          <div key={dept} className="group">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500 hover:border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-xl text-pink-700 group-hover:text-pink-800">
                  {dept.name}
                </h3>
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/department/${dept.id}`}>
                    <Button variant="ghost" size="icon" className="hover:bg-pink-50">
                      <Pencil className="h-4 w-4 text-pink-500" />
                    </Button>
                  </Link>
                  <AlertButton 
                    confirmButtonLabel="Delete" 
                    title="Do you want to delete this department?"
                    onAction={() => {deleteDepaById(dept.id)}}
                  >
                    <Button size="icon">
                      <Trash2 />
                    </Button>
                  </AlertButton>
                </div>
              </div>
          
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Owner:</span>
                  <span className="text-gray-800">
                    <LoadOwner showOwner={true} departmentUsers={dept.department_users} />
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-pink-500" />
                  <span>{dept.department_users.length} members</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2 text-pink-500" />
                  <LoadTask taskDepartments={dept.task_departments} showDetail={true} />
                </div>
                <div className="flex items-center text-gray-800 font-medium">
                  <LoadTask taskDepartments={dept.task_departments} showPercent={true} />
                </div>
              </div>
              <LoadTask taskDepartments={dept.task_departments} showProgress={true} />
            </div>
          </div>          
          ))}
        </div>
      )}
    </ScrollArea>
    }
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDepartment } from '@/hooks/use-department'
import { ScrollArea } from "@/components/ui/scroll-area"
import LoadPeople from '@/components/department/LoadPeople'
import { useDepartmentContext } from "@/context/department-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Plus, ArrowLeft, Users, Briefcase } from 'lucide-react'
import { ToastAction } from '../ui/toast'
import AddDeptUser from './AddDeptUser'
import Link from 'next/link'
import LoadTask from './LoadTask'

export default function ClientDeptId({id}:{id:number}) {
  const router = useRouter()
  const [department, setDepartment] = useState<any[]>([])
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState<string>("")
  const [deptName, setDeptName] = useState<string>("")
  const {data: departmentUserData} = useDepartment(id)
  const {deptAllFetch,toast,updateNameDept} = useDepartmentContext();
  const [deptUser, setDeptUser] = useState<any[]>([]);
  const [deptTask, setDeptTask] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (departmentUserData) {
        setDepartment(departmentUserData)
        setNewName(departmentUserData.name)
        setDeptName(departmentUserData.name)
        console.log(departmentUserData.task_departments)
        setDeptTask(departmentUserData.task_departments)
        setDeptUser(departmentUserData.department_users);
      }
    };
    fetchData();
  }, [departmentUserData]);

  const handleNameEdit = () => {
    setDeptName(newName)
    HandleNameData()
    setIsEditingName(false)
  }

  const HandleNameData = async () => {
    try {
      const data = [
        {
          op: "replace", 
          path: "/name", 
          value: newName,
        }
      ];
      await updateNameDept(id, data);
      deptAllFetch.mutate();
      toast({
        description: "successfully add department",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "add department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      })
    }
  };

  return (
    <div className="w-full p-4">
      <Button variant="ghost" onClick={() => router.push('/department')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Department
      </Button>
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="max-w-sm"
                />
                <Button onClick={handleNameEdit}>Save</Button>
              </div>
            ) : (
              <CardTitle className="text-3xl font-bold text-primary">{deptName}</CardTitle>
            )}
            {!isEditingName && (
              <Button variant="outline" size="icon" onClick={() => setIsEditingName(true)}>
                <Pencil className="h-4 w-4 text-primary" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employees</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] mb-4">
                  <ul className="space-y-4 pr-4 ">
                    <LoadPeople setDeptUser={setDeptUser} showOwner={false} departmentUsers={deptUser}/>
                  </ul>
                </ScrollArea>
                <AddDeptUser setDeptUser={setDeptUser} idDept={id} nameDept={deptName} departmentUsers={deptUser}/>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                <Briefcase className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <ul className="space-y-4 pr-4">
                    <LoadTask showOverView={true} taskDepartments={deptTask} />
                  </ul>
                </ScrollArea>
                <Link href={`/task`}>
                  <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
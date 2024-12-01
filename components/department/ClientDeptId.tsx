'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDepartment } from '@/hooks/use-department'
import { ScrollArea } from "@/components/ui/scroll-area"
import LoadPeople from '@/components/department/LoadPeople'
import { useDepartmentContext } from "@/context/department-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Plus, Trash2, ArrowLeft, Users, Briefcase, CheckCircle, AlertCircle, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import MyAvatar from '@/components/Avatar';
import { ToastAction } from '../ui/toast'

export default function ClientDeptId({id}:{id:number}) {
  const router = useRouter()
  const [department, setDepartment] = useState<any[]>([])
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState<string>()
  const [deptName, setDeptName] = useState<string>()
  const {data: departmentUserData, isLoading} = useDepartment(id)
  const {updateDept,deptAllFetch,toast} = useDepartmentContext();
  const [deptUser, setDeptUser] = useState<any[]>([]);
  const [deptTask, setDeptTask] = useState<any[]>([]);
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (departmentUserData) {
        setDepartment(departmentUserData)
        setNewName(departmentUserData.name)
        setDeptName(departmentUserData.name)
        setDeptTask(departmentUserData.task_departmemts)
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
      await updateDept(id, data);
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

  // const handleAddEmployees = () => {
  //   setDepartment({
  //     ...department,
  //     employees: [...department.employees, ...selectedEmployees]
  //   })
  //   setSelectedEmployees([])
  //   setIsAddEmployeeDialogOpen(false)
  // }

  // const handleDeleteEmployee = (id: number) => {
  //   setDepartment({ ...department, employees: department.employees.filter(emp => emp.id !== id) })
  // }

  // const handleEmployeePositionChange = (employeeId: number, newPosition: 'member' | 'owner') => {
  //   setDepartment({
  //     ...department,
  //     employees: department.employees.map(emp =>
  //       emp.id === employeeId ? { ...emp, position: newPosition } : emp
  //     ),
  //   })
  // }

  // const handleAddTask = () => {
  //   const newTask: Task = {
  //     id: Date.now(),
  //     name: 'New Task',
  //     description: 'Task description',
  //     progress: 0,
  //   }
  //   setDepartment({ ...department, tasks: [...department.tasks, newTask] })
  // }

  // const handleSelectEmployee = (employeeId: string) => {
  //   const employee = allEmployees.find(emp => emp.id.toString() === employeeId)
  //   if (employee && !selectedEmployees.some(e => e.id === employee.id)) {
  //     setSelectedEmployees([...selectedEmployees, employee])
  //   }
  // }

  // const handleRemoveSelectedEmployee = (id: number) => {
  //   setSelectedEmployees(selectedEmployees.filter(emp => emp.id !== id))
  // }

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
                <ScrollArea className="h-[400px]">
                  <ul className="space-y-4 pr-4">
                    <LoadPeople showOwner={false} departmentUsers={deptUser}/>
                  </ul>
                </ScrollArea>
                <Dialog open={isAddEmployeeDialogOpen} onOpenChange={setIsAddEmployeeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsAddEmployeeDialogOpen(true)} className="mt-4 w-full bg-blue-500 hover:bg-blue-600">
                      <UserPlus className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Employees</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an employee" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* {department.map((employee) => (
                              <SelectItem key={employee.id} value={employee.id.toString()}>
                                {employee.name}
                              </SelectItem>
                            ))} */}
                        </SelectContent>
                      </Select>
                    </div>
                    <ScrollArea className="h-[200px] mt-4">
                      <div className="space-y-2">
                        {selectedEmployees.map((employee) => (
                          <Card key={employee.id} className="bg-secondary/50">
                            <CardContent className="flex items-center justify-between p-2">
                              <div className="flex items-center space-x-2">
                                <Avatar>
                                  <AvatarImage src={employee.avatar} alt={employee.name} />
                                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{employee.name}</span>
                              </div>
                              {/* <Button variant="ghost" size="icon" onClick={() => handleRemoveSelectedEmployee(employee.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button> */}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setIsAddEmployeeDialogOpen(false)}>Cancel</Button>
                      {/* <Button onClick={handleAddEmployees} disabled={selectedEmployees.length === 0}>Add Selected</Button> */}
                    </div>
                  </DialogContent>
                </Dialog>
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
                    {/* {department.tasks.map((task) => (
                      <li key={task.id} className="bg-secondary/50 p-3 rounded-md">
                        <h4 className="font-semibold flex items-center">
                          {task.progress === 100 ? (
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                          )}
                          {task.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="ml-2 text-sm font-medium">Status: </span>
                          <span className="ml-2 text-sm font-medium text-primary">Done</span>
                        </div>
                      </li>
                    ))} */}
                  </ul>
                </ScrollArea>
                {/* <Button onClick={handleAddTask} className="mt-4 w-full bg-green-500 hover:bg-green-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button> */}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
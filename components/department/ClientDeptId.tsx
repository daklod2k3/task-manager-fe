'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Plus, Trash2, ArrowLeft, Users, Briefcase, CheckCircle, AlertCircle, UserPlus } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import MyAvatar from '@/components/Avatar';
import { useDepartment } from '@/hooks/use-department'
import LoadOwner from '@/components/department/LoadPeople'

interface Employee {
  id: number
  name: string
  position: 'member' | 'owner'
  avatar: string
}

interface Task {
  id: number
  name: string
  description: string
  progress: number
}

interface Department {
  id: number
  name: string
  employees: Employee[]
  tasks: Task[]
}

const mockDepartment: Department = {
  id: 1,
  name: 'Marketing',
  employees: [
    { id: 1, name: 'John Doe', position: 'owner', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'Jane Smith', position: 'member', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'Loc', position: 'member', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 4, name: 'Nam', position: 'owner', avatar: '/placeholder.svg?height=40&width=40' },
  ],
  tasks: [
    { id: 1, name: 'Q2 Campaign', description: 'Plan and execute Q2 marketing campaign', progress: 75 },
    { id: 2, name: 'Website Redesign', description: 'Redesign company website', progress: 30 },
    { id: 3, name: 'Website design', description: 'UI website', progress: 30 },
  ],
}

// Mock list of all employees in the company
const allEmployees: Employee[] = [
  { id: 3, name: 'Alice Johnson', position: 'member', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 4, name: 'Bob Williams', position: 'member', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 5, name: 'Charlie Brown', position: 'member', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 6, name: 'Diana Martinez', position: 'member', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 7, name: 'Edward Lee', position: 'member', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 8, name: 'Nam', position: 'owner', avatar: '/placeholder.svg?height=40&width=40' },
]

export default function ClientDeptId({id}:{id:number}) {
  const router = useRouter()
  const [department, setDepartment] = useState<Department>(mockDepartment)
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState(department.name)
  const {data: departmentUserData, isLoading} = useDepartment(id)
  const [deptUser, setDeptUser] = useState<any[]>([]);
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])


  useEffect(() => {
    setDepartment(mockDepartment)
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      if (departmentUserData) {
        setDeptUser(departmentUserData.department_users);
      }
    };
    fetchData();
  }, [departmentUserData]);

  const handleNameEdit = () => {
    setDepartment({ ...department, name: newName })
    setIsEditingName(false)
  }

  const handleAddEmployees = () => {
    setDepartment({
      ...department,
      employees: [...department.employees, ...selectedEmployees]
    })
    setSelectedEmployees([])
    setIsAddEmployeeDialogOpen(false)
  }

  const handleDeleteEmployee = (id: number) => {
    setDepartment({ ...department, employees: department.employees.filter(emp => emp.id !== id) })
  }

  const handleEmployeePositionChange = (employeeId: number, newPosition: 'member' | 'owner') => {
    setDepartment({
      ...department,
      employees: department.employees.map(emp =>
        emp.id === employeeId ? { ...emp, position: newPosition } : emp
      ),
    })
  }

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      name: 'New Task',
      description: 'Task description',
      progress: 0,
    }
    setDepartment({ ...department, tasks: [...department.tasks, newTask] })
  }

  const handleSelectEmployee = (employeeId: string) => {
    const employee = allEmployees.find(emp => emp.id.toString() === employeeId)
    if (employee && !selectedEmployees.some(e => e.id === employee.id)) {
      setSelectedEmployees([...selectedEmployees, employee])
    }
  }

  const handleRemoveSelectedEmployee = (id: number) => {
    setSelectedEmployees(selectedEmployees.filter(emp => emp.id !== id))
  }

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
              <CardTitle className="text-3xl font-bold text-primary">{department.name}</CardTitle>
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
                    {/* {department.employees.map((employee) => (
                      <li key={employee.id} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                        <div className="flex items-center space-x-2">
                          <MyAvatar />
                          <span className="font-medium">{employee.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select
                            value={employee.position}
                            onValueChange={(value: 'member' | 'owner') => handleEmployeePositionChange(employee.id, value)}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="owner">Owner</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="destructive" size="icon" onClick={() => handleDeleteEmployee(employee.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))} */}
                    <LoadOwner showOwner={false} departmentUsers={deptUser}/>
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
                      <Select onValueChange={handleSelectEmployee}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an employee" />
                        </SelectTrigger>
                        <SelectContent>
                          {allEmployees
                            .filter(emp => !department.employees.some(deptEmp => deptEmp.id === emp.id) && 
                                           !selectedEmployees.some(selEmp => selEmp.id === emp.id))
                            .map((employee) => (
                              <SelectItem key={employee.id} value={employee.id.toString()}>
                                {employee.name}
                              </SelectItem>
                            ))}
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
                              <Button variant="ghost" size="icon" onClick={() => handleRemoveSelectedEmployee(employee.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setIsAddEmployeeDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddEmployees} disabled={selectedEmployees.length === 0}>Add Selected</Button>
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
                    {department.tasks.map((task) => (
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
                    ))}
                  </ul>
                </ScrollArea>
                <Button onClick={handleAddTask} className="mt-4 w-full bg-green-500 hover:bg-green-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
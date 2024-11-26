'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Department {
  id: number
  name: string
  owner: string
  members: number
  tasksCompleted: number
  totalTasks: number
}

interface AddDepartmentModalProps {
  onAddDepartment: (department: Omit<Department, 'id'>) => void
}

export function AddDepartmentModal({ onAddDepartment }: AddDepartmentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    members: '',
    tasksCompleted: '',
    totalTasks: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddDepartment({
      name: formData.name,
      owner: formData.owner,
      members: parseInt(formData.members),
      tasksCompleted: parseInt(formData.tasksCompleted),
      totalTasks: parseInt(formData.totalTasks),
    })
    setFormData({ name: '', owner: '', members: '', tasksCompleted: '', totalTasks: '' })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Department</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Department Owner</Label>
            <Input
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="members">Number of Members</Label>
            <Input
              id="members"
              name="members"
              type="number"
              value={formData.members}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tasksCompleted">Completed Tasks</Label>
            <Input
              id="tasksCompleted"
              name="tasksCompleted"
              type="number"
              value={formData.tasksCompleted}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalTasks">Total Tasks</Label>
            <Input
              id="totalTasks"
              name="totalTasks"
              type="number"
              value={formData.totalTasks}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Department</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
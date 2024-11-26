'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Department {
  id: number
  name: string
  owner: string
  members: number
  tasksCompleted: number
  totalTasks: number
}

interface DepartmentDetailModalProps {
  department: Department | null
  isOpen: boolean
  onClose: () => void
}

export function DepartmentDetailModal({ department, isOpen, onClose }: DepartmentDetailModalProps) {
  if (!department) return null

  const taskCompletionPercentage = (department.tasksCompleted / department.totalTasks) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{department.name} Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium">ID</dt>
                  <dd>{department.id}</dd>
                </div>
                <div>
                  <dt className="font-medium">Owner</dt>
                  <dd>{department.owner}</dd>
                </div>
                <div>
                  <dt className="font-medium">Members</dt>
                  <dd>{department.members}</dd>
                </div>
                <div>
                  <dt className="font-medium">Tasks</dt>
                  <dd>{department.tasksCompleted} / {department.totalTasks}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={taskCompletionPercentage} 
                className="h-2 mt-2"
                aria-label={`${department.name} task completion`}
              />
              <p className="text-center mt-2">{taskCompletionPercentage.toFixed(0)}% Complete</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
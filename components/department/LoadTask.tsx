"use client";

import { useAllTask } from "@/hooks/use-task";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress"
import { Pencil, Plus, Trash2, ArrowLeft, Users, Briefcase, CheckCircle, AlertCircle, UserPlus } from 'lucide-react'

const LoadTask = ({ taskDepartments, showProgress= false, showPercent=false, showDetail=false, showOverView=false }
    :{
        taskDepartments:any,
        showProgress?:boolean,
        showPercent?: boolean,
        showDetail?: boolean,
        showOverView?: boolean,
    }) => {
  const { data: tasks, isLoading } = useAllTask();
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [taskData, setTaskData] = useState<any[]>([]);

  useEffect(() => {
    if (tasks && taskDepartments.length > 0) {
      const taskIds = taskDepartments.map((taskDepartment) => taskDepartment.task_id);

      const completedTasks = tasks.filter(
        (task: any) => taskIds.includes(task.id) && task.status === "Done"
      );

      const filteredTasks = tasks.filter((task) =>
        taskDepartments.some((taskDept) => taskDept.task_id === task.id)
      );
      console.log(filteredTasks)
      setTaskData(filteredTasks)

      setCompletedTaskCount(completedTasks.length);
      setTotal(completedTasks.length/taskDepartments.length)
    }
  }, [tasks, taskDepartments]);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <>
    {showProgress && <Progress 
                        value={total * 100} 
                        className="h-2"
                      />}
    {showPercent && <span>{total * 100}% Complete</span>}
    {showDetail && <span>{completedTaskCount}/{taskDepartments.length} tasks</span>}
    {showOverView && taskData.map((task) => (
                      <li key={task.id} className="bg-secondary/50 p-3 rounded-md">
                        <h4 className="font-semibold flex items-center">
                          {task.progress === 100 ? (
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                          )}
                          {task.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="ml-2 text-sm font-medium">Status: </span>
                          <span className="ml-2 text-sm font-medium text-primary">{task.status}</span>
                        </div>
                      </li>
                    ))}
    </> 
  );
};

export default LoadTask;
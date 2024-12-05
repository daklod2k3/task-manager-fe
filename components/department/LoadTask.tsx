"use client";

import { useTask } from "@/hooks/use-task";
import {
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const LoadTask = ({
  taskDepartments,
  showDetail = false,
  showOverView = false,
}: {
  taskDepartments: any[];
  showDetail?: boolean;
  showOverView?: boolean;
}) => {
  const { data: tasks, isLoading } = useTask({});
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [taskData, setTaskData] = useState<any[]>([]);


  // useEffect(() => {

  //   if (tasks && taskDepartments.length > 0) {
  //     console.log(taskDepartments)
  //     const taskIds = taskDepartments.map(
  //       (taskDepartment) => taskDepartment.task_id,
  //     );
  //     setTaskData(filteredTasks);
  //   }
  // }, [tasks, taskDepartments]);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (taskDepartments.length == 0) {
    return <div>No Task in Department</div>;
  }

  return (
    <>
      {showOverView &&
        taskDepartments.map((item) => (
          <li key={item.id} className="rounded-md bg-secondary/50 p-3">
            <h4 className="flex items-center font-semibold">
              {item.progress === 100 ? (
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
              )}
              {item.task.title}
            </h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="mt-2 flex items-center">
              <span className="ml-2 text-sm font-medium">Status: </span>
              <span className="ml-2 text-sm font-medium text-primary">
                {item.task.status}
              </span>
            </div>
          </li>
        ))}
    </>
  );
};

export default LoadTask;

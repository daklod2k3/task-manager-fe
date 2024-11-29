"use client";

import { useAllTask } from "@/hooks/use-task";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress"

const LoadTask = ({ taskDepartments, showProgress= false, showPercent=false, showDetail=false }
    :{
        taskDepartments:any,
        showProgress?:boolean,
        showPercent?: boolean,
        showDetail?: boolean
    }) => {
  const { data: tasks, isLoading } = useAllTask();
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (tasks && taskDepartments.length > 0) {
      // Lấy các task ids từ taskDepartments
      const taskIds = taskDepartments.map((taskDepartment) => taskDepartment.task_id);

      // Tính toán số lượng task đã hoàn thành
      const completedTasks = tasks.filter(
        (task: any) => taskIds.includes(task.id) && task.status === "Done"
      );

      // Cập nhật số lượng task đã hoàn thành vào state
      setCompletedTaskCount(completedTasks.length);
      setTotal(completedTasks.length/taskDepartments.length)
    }
  }, [tasks, taskDepartments]);

  if (isLoading) {
    return <div>Loading tasks...</div>; // Trả về loading nếu dữ liệu chưa tải xong
  }

  return (
    <>
    {showProgress && <Progress 
                        value={total * 100} 
                        className="h-2"
                      />}
    {showPercent && <span>{total * 100}% Complete</span>}
    {showDetail && <span>{completedTaskCount}/{taskDepartments.length} tasks</span>}
    </> 
  );
};

export default LoadTask;
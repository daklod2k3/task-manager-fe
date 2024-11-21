"use client";

import React, { useState, useEffect } from 'react';
import { useTask,useAllTask } from "@/hooks/use-task";
import Avatar from "@/components/Avatar";
import Loading from '../Loading';

export default function LoadTask(
  { id, className="", showName = false, showDesc = false, showDoing = false,showIcon=false, showLoading=true } : 
  { id: number, 
    className?:string, 
    showName?: boolean, 
    showDesc?: boolean, 
    showDoing?: boolean,
    showIcon?: boolean,
    showLoading?: boolean}
) {
  const taskFetch = useTask(id);
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (taskFetch.data) {
        console.log(taskFetch.data)
        setTask(taskFetch.data[0]);
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskFetch.data]);

  if (loading && showLoading) return <Loading/>;
  if (loading && !showLoading) return;
  if (!setTask) return <div>Không tìm thấy công việc</div>;

  return (
    <div className={className}>
        {showIcon && <div className="mr-3 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600">📄</span>
        </div>}
        <div>
          {showName && <p className="font-medium w-fit max-h-[20px] h-[20px]">{task.title}</p>}
          {showDesc && task.description && <p className="text-sm text-gray-500">{task.description}</p>}
        </div>
        {showDoing && <h1 className="ml-2">| Complete: <span className="text-primary">100%</span></h1>}
    </div>
  );
}

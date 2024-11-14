"use client";
import { Tables } from "@/entity/database.types";
import { TaskFilter, useAllTask, useTask } from "@/hooks/use-task";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ITaskContext {
  taskFetch: ReturnType<typeof useAllTask>;
  taskDetail: ReturnType<typeof useState<Tables<"tasks">>>;
  taskFilter: ReturnType<typeof useState<TaskFilter>>;
  // setOpen: (task?: Tables<"tasks">) => void;
}

export const TaskContext = createContext<ITaskContext | undefined>(undefined);

export function TaskProvider({ children }) {
  const taskDetail = useState<Tables<"tasks">>();
  const taskFilter = useState<TaskFilter>();

  const taskFetch = useAllTask(taskFilter[0]);

  //
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (taskDetail[0]?.id) {
      params.set("task_id", String(taskDetail[0].id));
    } else {
      params.delete("task_id");
    }
    // replace(`${pathname}?${params.toString()}`);
    console.log("task detail", taskDetail[0]);
  }, [taskDetail]);

  const value = {
    taskFetch,
    taskDetail,
    // setOpen: setOpenTask,
    taskFilter,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("You must wrap with Task Provider");
  return context;
}

"use client";
import { Tables } from "@/entity/database.types";
import { TaskEntity } from "@/entity/Task";
import { TaskFilter, useAllTask, useTask } from "@/hooks/use-task";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ITaskContext {
  taskFetch: ReturnType<typeof useAllTask>;
  taskDetail: ReturnType<typeof useState<TaskEntity>>;
  taskFilter: ReturnType<typeof useState<TaskFilter>>;
  setDetail: (id?: number) => void;
}

export const TaskContext = createContext<ITaskContext | undefined>(undefined);

export function TaskProvider({ children }) {
  const taskDetail = useState<TaskEntity>();
  const taskFilter = useState<TaskFilter>();

  const taskFetch = useAllTask(taskFilter[0]);

  //
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const setDetail = (id?: number) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      taskDetail[1]({ id } as Tables<"tasks">);
      params.set("task_id", String(id));
    } else {
      taskDetail[1](undefined);
      params.delete("task_id");
    }
    console.log("replace");

    replace(`${pathname}?${params.toString()}`);
  };

  const value = {
    taskFetch,
    taskDetail,
    // setOpen: setOpenTask,
    setDetail,
    taskFilter,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("You must wrap with Task Provider");
  return context;
}

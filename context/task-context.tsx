"use client";
import { Tables } from "@/entity/database.types";
import { TaskFilter, useAllTask, useTask } from "@/hooks/use-task";
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

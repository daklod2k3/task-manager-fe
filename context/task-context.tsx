"use client";
import { TaskDialog } from "@/components/task/task-detail";
import { Tables } from "@/entity/database.types";
import { useAllTask, useTask } from "@/hooks/use-task";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ITaskContext {
  taskFetch: ReturnType<typeof useAllTask>;
  taskDetail: ReturnType<typeof useState<Tables<"tasks">>>;
  // setOpen: (task?: Tables<"tasks">) => void;
}

export const TaskContext = createContext<ITaskContext | undefined>(undefined);

export function TaskProvider({ children }) {
  const taskFetch = useAllTask();
  const taskDetail = useState<Tables<"tasks">>();

  const value = {
    taskFetch,
    taskDetail,
    // setOpen: setOpenTask,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("You must wrap with Task Provider");
  return context;
}

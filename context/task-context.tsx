"use client";
import { Tables } from "@/entity/database.types";
import { TaskEntity } from "@/entity/Entity";
import { TaskFilter, useTask } from "@/hooks/use-task";
import useTaskFromDepartment from "@/hooks/use-task-from-department";
import useTaskFromUser from "@/hooks/use-task-from-user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { mutate } from "swr";

interface ITaskContext {
  taskFetch:
    | typeof useTask
    | typeof useTaskFromDepartment
    | typeof useTaskFromUser;
  taskDetail: ReturnType<typeof useState<TaskEntity>>;
  taskFilter: ReturnType<typeof useState<TaskFilter>>;
  setDetail: (id?: number) => void;
  department_id?: number;
}

export const TaskContext = createContext<ITaskContext | undefined>(undefined);
const taskFetchFromType = {
  department: useTaskFromDepartment,
  user: useTaskFromUser,
  all: useTask,
};

export function TaskProvider({
  children,
  type = "all",
  department_id,
}: {
  children: React.ReactNode;
  type: keyof typeof taskFetchFromType;
  department_id?: number;
}) {
  const taskDetail = useState<TaskEntity>();
  const taskFilter = useState<TaskFilter>();
  const taskFetch = taskFetchFromType[type];

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

  console.log(taskFilter);

  const value = {
    taskFetch,
    taskDetail,
    // setOpen: setOpenTask,
    setDetail,
    taskFilter,
    department_id,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("You must wrap with Task Provider");
  return context;
}

export async function mutateTaskList() {
  return await mutate(
    (key) => {
      console.log(key);
      return String(key?.url).includes("task");
    },
    undefined,
    { revalidate: true },
  );
}

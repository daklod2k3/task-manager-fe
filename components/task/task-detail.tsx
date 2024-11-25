import { useTaskContext } from "@/context/task-context";
import { Database, Tables } from "@/entity/database.types";
import { TaskEntity } from "@/entity/Entity";
import { useTask } from "@/hooks/use-task";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import TaskDetail2 from "./task-detail-2";

export function TaskDialog() {
  const {
    taskDetail: [detail, setDetail],
    setDetail: setOpenDetail,
  } = useTaskContext();

  const { data: taskFetch, error, isLoading } = useTask(detail?.id);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const task_id = searchParams.get("task_id");
    if (task_id) setDetail({ id: Number(task_id) } as Tables<"tasks">);
  }, []);

  console.log(taskFetch);

  return (
    <Dialog
      open={detail?.id ? true : false}
      onOpenChange={(x) => {
        console.log(x);
        if (!x && detail) setOpenDetail();
      }}
    >
      <DialogContent
        //  className="max-w-screen-xl "
        className="mx-auto flex max-h-[calc(100vh-10rem)] min-h-0 w-full max-w-7xl p-2"
      >
        <ScrollArea className="grid min-h-0 flex-1">
          {isLoading && <Loading />}
          {taskFetch && detail && (
            <TaskDetail2 item={taskFetch as TaskEntity} />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

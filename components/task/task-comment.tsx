import { Filter, FilterLogic, FilterOperators, RootFilter } from "@/action/Api";
import { addTaskComment } from "@/action/TaskComment";
import { useTaskComment } from "@/hooks/use-task-comment";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "../ui/badge";

import { ScrollArea } from "../ui/scroll-area";

interface Props {
  task_id: number;
}

export default function TaskComment({ task_id }: Props) {
  const { data, mutate: mutateComment } = useTaskComment(
    undefined,
    new RootFilter({
      Filters: [
        new Filter({
          Field: "TaskId",
          Operator: FilterOperators.eq,
          Value: task_id,
        }),
      ],
    }),
  );
  const { toast } = useToast();

  return (
    <div className="grid min-h-0 flex-1 flex-col gap-2">
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex max-h-full min-h-0 flex-col space-y-4 pr-4">
          {data?.length === 0 && (
            <span className="text-muted-foreground">No comments found</span>
          )}
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 rounded-lg bg-muted/50 p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <span className="text-xs font-medium">{item.user.name[0]}</span>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="flex items-center gap-2 font-semibold">
                  <Badge className="bg-sky-500">{item.user.name}</Badge>
                  <span className="text-sm font-normal text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </span>
                <span className="break-words">{item.comment}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

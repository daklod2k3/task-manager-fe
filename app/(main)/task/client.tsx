"use client";

import Loading from "@/components/Loading";
import SearchInput from "@/components/SearchInput";
import Kanban from "@/components/task/kanban";
import UserItem from "@/components/task/user-item";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { taskList, userList } from "@/entity/testData";
import useTask from "@/hooks/use-task";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// const items = [
//   {
//     id: "recents",
//     label: "Recents",
//   },
//   {
//     id: "home",
//     label: "Home",
//   },
//   {
//     id: "applications",
//     label: "Applications",
//   },
//   {
//     id: "desktop",
//     label: "Desktop",
//   },
//   {
//     id: "downloads",
//     label: "Downloads",
//   },
//   {
//     id: "documents",
//     label: "Documents",
//   },
// ] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function Client(props: {
  searchParams?: {
    task_id?: string;
  };
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  const task_id = props.searchParams?.task_id || undefined;

  const taskListBE = useTask();
  if (!taskListBE?.data) return <Loading />;
  console.log(taskListBE.data);

  const onUserFilter = () => {};

  const userSelect = () => {
    const items = userList;
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUserFilter)} className="space-y-8">
          <FormField
            control={form.control}
            name="items"
            render={() => {
              return (
                <FormItem>
                  <div className="flex flex-wrap -space-x-1">
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          const checkedState = field.value?.includes(item.id);
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row space-x-0 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  hidden={true}
                                  checked={checkedState}
                                  onCheckedChange={(checked) => {
                                    console.log("clcik");

                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="space-y-0 font-normal">
                                <UserItem
                                  className={cn(
                                    "cursor-pointer shadow ring-2 hover:z-10",
                                    checkedState
                                      ? "z-10 ring-primary"
                                      : "ring-white",
                                  )}
                                  user={item}
                                />
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    );
  };

  return (
    <div className="flex max-h-full min-h-0 min-w-0 flex-col gap-5 p-4 text-foreground">
      <h1 className="text-lg font-bold">Task List</h1>
      <div className="flex items-center gap-3">
        <SearchInput className="bg-white" />
        {userSelect()}
        <Button variant={"link"}>Clear filter</Button>
      </div>
      <Kanban taskList={taskListBE.data} />
      {/* <Kanban taskList={taskList} /> */}
    </div>
  );
}

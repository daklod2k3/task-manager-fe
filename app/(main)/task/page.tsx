"use client";

import MyAvatar from "@/components/Avatar";
import HoverInfo from "@/components/HoverInfo";
import SearchInput from "@/components/SearchInput";
import Kanban from "@/components/task/kanban";
import UserItem from "@/components/task/UserItem";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userList } from "@/entity/testData";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
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

export default function Component() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

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
                              className="flex flex-row space-y-0 space-x-0"
                            >
                              <FormControl>
                                <Checkbox
                                  hidden={true}
                                  checked={checkedState}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal space-y-0">
                                <UserItem
                                  className={cn(
                                    "shadow ring-2 cursor-pointer hover:z-10",
                                    checkedState
                                      ? "ring-primary z-10"
                                      : "ring-white"
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
    <div className="p-4 flex flex-col min-h-0 min-w-0 gap-5 max-h-full">
      <h1 className="text-2xl font-bold text-primary">Task List</h1>
      <div className="flex gap-3 items-center">
        <SearchInput className="bg-white" />
        {userSelect()}
        <Button variant={"link"}>Clear filter</Button>
      </div>
      <Kanban />
    </div>
  );
}

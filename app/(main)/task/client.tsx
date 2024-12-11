"use client";

import { Filter, FilterOperators, RootFilter } from "@/action/Api";
import BuildBreadcrumb from "@/components/build-breadcrumb";
import HoverInfo from "@/components/HoverInfo";
import Loading from "@/components/Loading";
import PageHeader from "@/components/page-header";
import SearchSelect from "@/components/search-select";
import SearchInput from "@/components/SearchInput";
import CreateTaskDialog from "@/components/task/create-task";
import Kanban from "@/components/task/kanban";
import { TaskDialog } from "@/components/task/task-detail";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTaskContext } from "@/context/task-context";
import { Tables } from "@/entity/database.types";
import { useDepartment } from "@/hooks/use-department";
import { peopleToSearch, usePeople } from "@/hooks/use-people";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Plus, PlusCircle } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

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

interface Props {
  department_id?: string;
}

export default function ClientTask({ department_id }: Props) {
  const {
    taskFilter: [, setFilter],
    taskFetch: useTask,
  } = useTaskContext();

  const { mutate } = useTask({ load: true });
  const { data: department } = useDepartment({
    load: Boolean(department_id),
    id: department_id,
  });

  console.log(department);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const searchTaskName = (value: string) => {
    setFilter({
      filter: {
        field: "title",
        operator: FilterOperators.ctn,
        value: value,
      },
    });
    mutate();
  };

  // const onUserFilter = () => {};

  const searchBounce = useCallback(
    async (search: string, callback: (search: string) => void) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (!search) {
        setFilter({});
        return;
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => callback(search), 500);
    },
    [],
  );
  // const UserSelect = () => {
  //   const { data: items, isLoading } = usePeople();
  //   if (isLoading || !items) return;
  //   console.log(items);

  //   return (
  //     <Form {...form}>
  //       <form onSubmit={form.handleSubmit(onUserFilter)} className="space-y-8">
  //         <FormField
  //           control={form.control}
  //           name="items"
  //           render={() => {
  //             return (
  //               <FormItem>
  //                 <div className="flex flex-wrap -space-x-1">
  //                   {items.map((item) => (
  //                     <FormField
  //                       key={item.id}
  //                       control={form.control}
  //                       name="items"
  //                       render={({ field }) => {
  //                         const checkedState = field.value?.includes(item.id);
  //                         return (
  //                           <FormItem
  //                             key={item.id}
  //                             className="flex flex-row space-x-0 space-y-0"
  //                           >
  //                             <FormControl>
  //                               <Checkbox
  //                                 hidden={true}
  //                                 checked={checkedState}
  //                                 onCheckedChange={(checked) => {
  //                                   console.log("click");
  //                                   return checked
  //                                     ? field.onChange([
  //                                         ...field.value,
  //                                         item.id,
  //                                       ])
  //                                     : field.onChange(
  //                                         field.value?.filter(
  //                                           (value) => value !== item.id,
  //                                         ),
  //                                       );
  //                                 }}
  //                               />
  //                             </FormControl>
  //                             <FormLabel className="space-y-0 font-normal">
  //                               <UserItem
  //                                 className={cn(
  //                                   "cursor-pointer shadow ring-2 hover:z-10",
  //                                   checkedState
  //                                     ? "z-10 ring-primary"
  //                                     : "ring-white",
  //                                 )}
  //                                 user={item}
  //                               />
  //                             </FormLabel>
  //                           </FormItem>
  //                         );
  //                       }}
  //                     />
  //                   ))}
  //                 </div>
  //                 <FormMessage />
  //               </FormItem>
  //             );
  //           }}
  //         />
  //       </form>
  //     </Form>
  //   );
  // };

  return (
    <div className="flex max-h-full min-h-0 min-w-0 flex-col gap-5 p-4 pb-0 text-foreground">
      <BuildBreadcrumb>
        {department_id && department && department.name + " Task"}
      </BuildBreadcrumb>
      {/* {!department_id ? (
        <PageHeader>Your task</PageHeader>
      ) : (
        <div className="flex items-center gap-2 border-l-2 border-blue-500 px-4 py-2">
          <Building />
          <h1 className="text-lg font-bold">DEPARTMENT TASK</h1>
        </div>
      )} */}
      <div className="flex w-full items-center gap-3">
        <SearchInput
          className="bg-white"
          placeholder="Search task"
          onChange={(e) => searchBounce(e.currentTarget.value, searchTaskName)}
        />
        {/* <SearchSelect
          ItemRender={PeopleSearchItem}
          modal
          items={peopleToSearch(peoples ?? [])}
        /> */}
        {/* <UserSelect /> */}
        <CreateTaskDialog department_id={department_id}>
          <Button>
            <Plus className="mr-2" size={16} />
            Create task
          </Button>
        </CreateTaskDialog>
      </div>
      <Kanban />
      <TaskDialog />

      {/* <Kanban taskList={taskList} /> */}
    </div>
  );
}

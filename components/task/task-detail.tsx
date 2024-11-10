import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaskContext } from "@/context/task-context";
import { Tables } from "@/entity/database.types";
import { useTask } from "@/hooks/use-task";
import { cn } from "@/lib/utils";
import { Database } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import MyAvatar from "../Avatar";
import EditableField from "../editable-field";
import Loading from "../Loading";
import { Button } from "../ui/button";
import { CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import CommentInput from "./comment-input";
import { PriorityIcon } from "./utils";

interface Props {
  task: Tables<"tasks">;
}

const TaskTitle = ({
  title,
  textSize = "3xl",
}: {
  title: string;
  textSize?: string;
}) => {
  return <CardTitle className={`text-${textSize}`}>{title}</CardTitle>;
};

const FieldLabel = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  return (
    <Label className={cn("font-bold text-primary", className)}>{value}</Label>
  );
};

const FilterSelectItem = ({ children = null }) => {
  return <Button />;
};

const FilterSelect = ({
  form,
  items,
}: {
  form?: UseFormReturn;
  items: any[];
}) => {
  return (
    <FormField
      control={form?.control}
      name="items"
      render={() => {
        return (
          <FormItem>
            <div className="flex flex-wrap -space-x-1">
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form?.control}
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
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="space-y-0 font-normal">
                          {<FilterSelectItem />}
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
  );
};

const HistoryItem = ({
  user,
}: {
  user: Tables<"profiles">;
  item: Tables<"task_history">;
}) => {
  return (
    <div>
      <MyAvatar user={user} />
      <p>{user.name} </p>
    </div>
  );
};

export default function TaskDetail() {
  const {
    taskDetail: [task],
  } = useTaskContext();
  const { data: taskFetch, error, isLoading } = useTask(task?.id);
  const [taskChange, setChange] = useState(task);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!taskFetch?.id) return;
    const params = new URLSearchParams(searchParams);
    if (task?.id) {
      params.set("task_id", String(task.id));
    } else {
      params.delete("task_id");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [taskFetch]);

  if (isLoading)
    return (
      <div className="h-fit flex-grow-0 space-y-5">
        <div className="rounded bg-primary p-1 px-3 text-white">
          <TaskTitle title={"Task detail"} />
        </div>
        <div className="grid min-w-0 grid-cols-[2fr,1fr] gap-3">
          <div className="space-y-2">
            <div>
              <FieldLabel value="Title:" />
              <TaskTitle title={task?.title || ""} />
            </div>
          </div>
        </div>
        {/* <div></div> */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-36 w-full" />
      </div>
    );

  const data = taskFetch as Tables<"tasks">;
  // console.log(data);

  if (data)
    return (
      <div className="h-full min-h-0 w-full flex-grow space-y-5">
        <div className="rounded bg-primary p-1 px-3 text-white">
          <TaskTitle title={"Task detail"} />
        </div>
        <div className="grid min-w-0 grid-cols-[2.5fr,1fr] gap-3">
          <div className="space-y-2">
            <div>
              <FieldLabel value="Title:" />
              <TaskTitle title={data.title} />
            </div>
            <div className="grid min-w-0 grid-cols-[30%,1fr] items-center">
              <FieldLabel value="Priority:" />
              <Select
                defaultValue={data.priority}
                onValueChange={(value) => {
                  if (value && taskChange)
                    setChange({
                      ...taskChange,
                      priority:
                        Database["public"]["Enums"]["TaskPriority"][value],
                    });
                }}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">
                    <div className="flex items-center">
                      <PriorityIcon priority={"high"} />
                      <span>High</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Medium">
                    <div className="flex w-full items-center justify-between">
                      <PriorityIcon priority={"medium"} />
                      <span>Medium</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Low">
                    <div className="flex items-center">
                      <PriorityIcon priority={"low"} />
                      <span>Low</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FieldLabel className={"text-primary"} value="Description" />
            <EditableField
              placeholder="add description..."
              value={data.description}
            />

            <CommentInput className="mt-4" />

            <TaskTitle title="Activity" textSize="xl" />
            {/* Select tab */}
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="account">History</TabsTrigger>
                <TabsTrigger value="password">Comment</TabsTrigger>
              </TabsList>
              <TabsContent value="account">History lists</TabsContent>
              <TabsContent value="password">Comment list </TabsContent>
            </Tabs>
          </div>
          {/* <Separator orientation="vertical" className=""/> */}
          <div className="flex flex-col space-y-3">
            <div className="space-x-2">
              <Button disabled={data == taskChange}> Save change</Button>
              <DialogClose>
                <Button variant={"ghost"}> Cancel</Button>
              </DialogClose>
            </div>
            <span>Details</span>
            <div className="grid grid-cols-[auto,auto] items-center justify-items-end gap-4 rounded border p-2">
              <FieldLabel value="Assignee:" />
              <MyAvatar size={7} />
              <FieldLabel value="Created at:" />
              <span>{new Date(data.created_at).toLocaleDateString()}</span>
              <FieldLabel value="Created by:" />
              <MyAvatar size={7} />
              <FieldLabel value="Due date:" />
              <span>{new Date(data.due_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
}

export function TaskDialog() {
  const {
    taskDetail: [detail, setDetail],
  } = useTaskContext();

  const searchParams = useSearchParams();

  useEffect(() => {
    const task_id = searchParams.get("task_id");
    if (task_id) setDetail({ id: Number(task_id) } as Tables<"tasks">);
  }, []);

  return (
    <Dialog
      open={detail != null && detail != undefined}
      onOpenChange={(x) => {
        console.log(x);
        if (!x && detail) setDetail(undefined);
      }}
    >
      <DialogContent className="max-h-[calc(100vh-10rem)] min-h-0 max-w-screen-xl">
        <TaskDetail />
      </DialogContent>
    </Dialog>
  );
}

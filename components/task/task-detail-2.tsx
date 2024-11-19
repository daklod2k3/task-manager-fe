"use client";

import { updateTask } from "@/action/Task";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useTaskContext } from "@/context/task-context";
import { Tables } from "@/entity/database.types";
import { TaskEntity } from "@/entity/Task";
import { peopleToSearch, usePeople } from "@/hooks/use-people";
import { useAllTask, useTask } from "@/hooks/use-task";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckSquare,
  ChevronRight,
  Edit,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Plus,
  Share2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MyAvatar from "../Avatar";
import Loading from "../Loading";
import SearchSelect, { PeopleSearchItem } from "../search-select";
import { Calendar } from "../ui/calendar";
import { DialogClose } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AddAssignee from "./add-assignee";
import { createTaskSchema } from "./create-task";
import { ColumnTitles } from "./kanban";
import { PriorityColor } from "./task-card";
import { PriorityIcon } from "./utils";

const updateTaskSchema = createTaskSchema.extend({
  id: z.number(),
  created_by: z.string(),
  status: z.string(),
});

export default function TaskDetail2({ item }: { item: TaskEntity }) {
  // FORM STATE
  const form = useForm({
    resolver: zodResolver(updateTaskSchema),
    mode: "all",
    defaultValues: {
      ...updateTaskSchema.parse({
        ...(item as Tables<"tasks">),
        due_date: item.due_date ? new Date(item.due_date) : undefined,
      }),
    },
  });

  // Data fetching
  const { data: peoples, isLoading: peopleLoading } = usePeople();
  const { toast } = useToast();
  const { mutate: mutateList } = useAllTask();
  const { mutate: mutateDetail } = useTask(item.id);
  const {
    taskDetail: [, setDetail],
  } = useTaskContext();

  // const

  // Component state
  const [saveLoading, setSaveLoading] = useState(false);

  const [assigneeSelect, setAssigneeSelect] = useState<Tables<"profiles">[]>(
    item.task_users?.map((x) => x.user || { id: x.user_id }) || [],
  );
  // console.log(assigneeSelect);

  // useEffect(() => {}, [taskFetch, task]);
  const handleSubmit = async (formData) => {
    setSaveLoading(true);
    const res = await updateTask(formData);
    await mutateDetail();
    await mutateList();
    setSaveLoading(false);
    if (res.error) {
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Task updated",
    });
    // setDetail(undefined);
  };
  console.log(item);
  console.log(item.task_users);

  // console.log(form.formState.errors);

  const addAssignee = (x) => {
    if (assigneeSelect.filter((item) => item.id == x.id).length > 0) return;
    setAssigneeSelect((prev) => [...prev, x]);
  };

  const removeAssignee = (x) => {
    setAssigneeSelect((prev) => prev.filter((value) => value.id !== x.id));
  };

  useEffect(() => {
    form.setValue(
      "task_users",
      assigneeSelect.map((x) => ({ user_id: x.id })),
    );
  }, [assigneeSelect, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input defaultValue={item.title} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </h1>
            <Badge
              className={`rounded-full bg-${PriorityColor(item.priority)}`}
            >
              {item.priority}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={async () => {
                try {
                  const res = await navigator.clipboard.writeText(
                    document.location.origin + "/task?task_id=" + item.id,
                  );
                  toast({
                    title: "Copied to clipboard",
                  });
                } catch {
                  toast({
                    title: "Error",
                    description: "Failed to copy",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <Paperclip className="mr-2 h-4 w-4" />
                Attachments
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <CheckSquare className="mr-2 h-4 w-4" />
                Checklists
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="font-semibold">Created by</Label>
                <Input
                  disabled
                  defaultValue={item.created_by_navigation?.name}
                />
              </div>

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due date</FormLabel>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="z-[100] w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h2 className="mb-4 font-semibold">History</h2>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center justify-between">
                  <Badge
                    className={`bg-${ColumnTitles.find((x) => x.title.toLowerCase() == item.status.toLowerCase())?.color}`}
                  >
                    {item.status.replaceAll("_", " ")}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Nov 22</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">2 hours</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current phase
                </span>
                <Badge
                  className={`bg-${ColumnTitles.find((x) => x.title.toLowerCase() == item.status.toLowerCase())?.color}`}
                >
                  {item.status.replaceAll("_", " ")}
                </Badge>
              </div>
              <Separator />
            </div>

            <div className="space-y-4">
              {/* <h3 className="font-medium">Assignee</h3>
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add assignee
              </Button> */}
              {/* <FormField
                control={form.control}
                render={({ field }) => ( */}
              <FormItem>
                <FormLabel>Assign to</FormLabel>
                <FormControl>
                  <>
                    <div className="flex flex-wrap gap-1">
                      {assigneeSelect.map((x) => (
                        <Badge key={x.id} className="flex gap-1 p-1">
                          <MyAvatar user={x} size={7} />
                          {x.name || x.id}
                          <X
                            size={18}
                            className="cursor-pointer rounded-full hover:bg-white hover:text-primary"
                            onClick={() => removeAssignee(x)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <AddAssignee task_id={item.id} />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
              {/* )} */}
              {/* /> */}
            </div>

            {/* <div className="space-y-4">
              <h3 className="font-medium">Move to phase</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-between">
                  Doing
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  Archived
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div> */}

            <div className="space-y-4">
              <h3 className="font-medium">Activities</h3>
              <div className="flex gap-2">
                <MyAvatar className="h-8 w-8" />
                <Textarea
                  placeholder="Write your comment..."
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className=""
              disabled={!form.formState.isDirty || saveLoading}
            >
              Save
              {saveLoading && (
                <Loader2 className="ml-2 animate-spin" size={14} />
              )}
            </Button>
            <Button variant="ghost" type="reset" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </CardContent>
      </form>
    </Form>
  );
}

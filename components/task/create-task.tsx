"client";
import { ApiRoutes } from "@/action/Api";
import { createTask } from "@/action/Task";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTaskContext } from "@/context/task-context";
import { Tables } from "@/entity/database.types";
import { peopleToSearch, usePeople } from "@/hooks/use-people";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Loader2, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";
import MyAvatar from "../Avatar";
import SearchSelect, { PeopleSearchItem } from "../search-select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { ToastAction } from "../ui/toast";
import { PriorityIcon } from "./utils";

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  due_date: z.date().nullable().optional(),
  task_users: z
    .array(
      z.object({
        user_id: z.string(),
      }),
    )
    .optional(),
  task_departments: z.array(z.object({ department_id: z.string() })).optional(),
});

interface Props {
  children: React.ReactNode;
  department_id?: string;
}

export default function CreateTaskDialog({ children, department_id }: Props) {
  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      due_date: null,
      task_users: [],
      task_departments: [department_id && { department_id }],
    },
  });

  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const {
    taskDetail: [, setDetail],
    taskFetch: useTask,
  } = useTaskContext();
  const { mutate } = useTask({});

  const { data: peoples, isLoading: peopleLoading } = usePeople({});
  const [assigneeSelect, setAssigneeSelect] = useState<Tables<"profiles">[]>(
    [],
  );

  const formSubmit = async (formData) => {
    // console.log(formData);
    const result = await createTask(formData);
    // console.log(result);
    if (!result || result?.error || !result?.data) {
      toast({
        title: "Task create failed",
        description: result?.error || "Unknown server error",
        variant: "destructive",
      });
      return;
    }
    mutate();
    toast({
      title: "Task created",
      description: `${result?.data.title} created`,
      action: (
        <ToastAction
          altText="Show detail"
          onClick={() => setDetail({ id: result?.data.id } as Tables<"tasks">)}
        >
          Show more
        </ToastAction>
      ),
    });
    setOpen(false);
    form.reset();
  };

  const addAssignee = (x) => {
    if (assigneeSelect.filter((item) => item.id == x.id).length > 0) return;
    setAssigneeSelect([...assigneeSelect, x]);
  };

  const removeAssignee = (x) => {
    setAssigneeSelect(assigneeSelect.filter((item) => item.id !== x.id));
  };

  useEffect(() => {
    form.setValue(
      "task_users",
      assigneeSelect.map((x) => ({ user_id: x.id })),
    );
  }, [assigneeSelect, form]);

  return (
    <Dialog defaultOpen={false} open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-xl font-bold text-foreground">Create Task</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmit)}
            className="space-y-3"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign to</FormLabel>
                  <FormControl>
                    <>
                      <div className="flex flex-wrap gap-1">
                        {assigneeSelect.map((x) => (
                          <Badge key={x.id} className="flex gap-1 p-1">
                            <MyAvatar user={x} size={7} />
                            {x.name}
                            <X
                              size={18}
                              className="cursor-pointer rounded-full hover:bg-white hover:text-primary"
                              onClick={() => removeAssignee(x)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <SearchSelect
                        isLoading={peopleLoading}
                        placeholder="Type to search"
                        modal={true}
                        variant="people"
                        onSelectedValueChange={(x) => {
                          console.log("click");
                          addAssignee(x);
                        }}
                        items={peopleToSearch(peoples || [])}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      // defaultValue="Medium"
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
                        selected={field.value || undefined}
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <DialogClose asChild onClick={() => setOpen(false)}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

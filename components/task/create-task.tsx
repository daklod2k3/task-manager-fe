"client";
import { createTask } from "@/action/Task";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTaskContext } from "@/context/task-context";
import { Tables } from "@/entity/database.types";
import { peopleToSearch, usePeople } from "@/hooks/use-people";
import UseTaskDetail from "@/hooks/use-task-detail";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { AutoComplete } from "../auto-complete";
import SearchSelect, { PeopleSearchItem } from "../search-select";
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

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  due_date: z.date().optional(),
});

export default function CreateTaskDialog({ children }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const {
    taskDetail: [, setDetail],
  } = useTaskContext();

  const { data: peoples, isLoading: peopleLoading } = usePeople();
  const [assigneeSelect, setAssigneeSelect] = useState<Tables<"profiles">[]>(
    [],
  );
  const [searchValue, setSearchValue] = useState("");

  const formSubmit = useCallback(
    async (formData) => {
      // console.log(formData);
      const result = await createTask(formData);
      // console.log(result);
      if (!result || result?.error) {
        toast({
          title: "Task create failed",
          description: result?.error || "Unknown server error",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Task created",
        description: `${result?.data[0].title} created`,
        action: (
          <ToastAction
            altText="Show detail"
            onClick={() =>
              setDetail({ id: result?.data[0].id } as Tables<"tasks">)
            }
          >
            Show more
          </ToastAction>
        ),
      });
      setOpen(false);
      form.reset();
    },
    [toast],
  );

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <SearchSelect
                      ItemRender={PeopleSearchItem}
                      modal
                      onSelectedValueChange={(x) =>
                        setAssigneeSelect([...assigneeSelect, x])
                      }
                      items={peopleToSearch(peoples)}
                    />
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
                      defaultValue="medium"
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">
                          <div className="flex items-center">
                            <PriorityIcon priority={"high"} />
                            <span>High</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex w-full items-center justify-between">
                            <PriorityIcon priority={"medium"} />
                            <span>Medium</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="low">
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
                        selected={field.value}
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
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { Filter, FilterLogic, FilterOperators, RootFilter } from "@/action/Api";
import { addTaskComment } from "@/action/TaskComment";
import { useTaskComment } from "@/hooks/use-task-comment";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowDownNarrowWide,
  Forward,
  Loader2,
  MessageSquare,
} from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import MyAvatar from "../Avatar";
import ToggleFilter from "../toggle-filter";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Toggle } from "../ui/toggle";

interface Props {
  task_id: number;
}

const schema = z.object({
  comment: z.string({ message: "Comment can't null" }),
});

export default function TaskComment({ task_id }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const [sendLoad, setSendLoad] = useState(false);
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
  console.log(data);

  const send = async (formData: z.infer<typeof schema>) => {
    setSendLoad(true);
    try {
      const res = await addTaskComment({
        task_id: task_id,
        comment: formData.comment,
      });
      if (!res || res?.error) throw res?.error;
      mutateComment();
    } catch (e) {
      console.log(e);
      toast({
        title: "Failed to send comment",
        description: "Server error",
        variant: "destructive",
      });
    }
    setSendLoad(false);
  };

  return (
    <div className="flex flex-1 flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(send)} className="space-y-4">
          <h3 className="font-medium">Comment</h3>
          <div className="flex w-full gap-2">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      onChange={field.onChange}
                      placeholder="Write your comment..."
                      className="flex-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <MyAvatar className="h-8 w-8" /> */}
            <Button
              className="gap-1"
              disabled={sendLoad}
              type="button"
              onClick={form.handleSubmit(send)}
            >
              Send {sendLoad && <Loader2 size={14} className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
      <ToggleFilter onChange={() => console.log()} label="Created date" />
      <ScrollArea className="grid max-h-80 min-h-0 flex-1">
        <div className="grid min-h-0 flex-col gap-2">
          {data?.length == 0 && (
            <span className="text-muted-foreground">No comment found</span>
          )}
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 rounded-lg bg-muted/50 p-3"
            >
              <MyAvatar user={item.user} size={8} />
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  <Badge className="bg-sky-500">{item.user.name}</Badge>{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </span>
                <span className="break-all">{item.comment}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
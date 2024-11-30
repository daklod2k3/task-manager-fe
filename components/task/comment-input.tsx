import { Filter, FilterOperators, RootFilter } from "@/action/Api";
import { addTaskComment } from "@/action/TaskComment";
import { useTaskComment } from "@/hooks/use-task-comment";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import MyAvatar from "../Avatar";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  task_id: number;
}

const schema = z.object({
  comment: z.string({ message: "Comment can't null" }),
});

export default function CommentInput({ className, task_id, ...props }: Props) {
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
      form.reset();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(send)} className="flex gap-2 space-y-4">
        <MyAvatar />
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
  );
}

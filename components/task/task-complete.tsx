import { completeTask } from "@/action/Task";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DropFileInput, FileFormData } from "../drop-file-input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";

interface Props {
  task_id: number;
}

export default function TaskRequirePreview({ task_id }: Props) {
  const form = useForm<FileFormData>({
    defaultValues: {
      files: [],
    },
  });

  const { toast } = useToast();

  const onSubmit = form.handleSubmit((formData) => {
    console.log("submit");
    if (formData.files.length === 0) {
      toast({
        title: "Submit error",
        description: "You must upload file to complete task",
        variant: "destructive",
      });
      return;
    }
    const data = new FormData();
    data.append("file", formData.files[0]);
    console.log(formData);
    // fetch("/api/taskComplete/" + task_id, {
    //   method: "POST",
    //   body: data,
    // })
    //   .then(async (res) => {
    //     console.log(await res.json());
    //   })
    //   .catch((e) => {
    //     console.log(e);

    //     toast({
    //       title: "Submit error",
    //       description: "Server error",
    //       variant: "destructive",
    //     });
    //   });

    completeTask(task_id, data)
      .then((res) => {
        console.log(res);
        toast({
          title: "Action success",
          description: "Marked task as complete",
        });
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Submit error",
          description: "Server error",
          variant: "destructive",
        });
      });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="h-10 w-full justify-between border-dashed border-purple-500 text-purple-500"
          type="button"
        >
          Ask preview to complete
          <ChevronRight />
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <form>
          <DialogContent className="flex h-[80vh] flex-col sm:max-w-[80vw]">
            <DialogHeader>
              <DialogTitle>Complete task</DialogTitle>
            </DialogHeader>
            <DropFileInput form={form} />
            <DialogFooter>
              <Button onClick={onSubmit}>Complete task</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

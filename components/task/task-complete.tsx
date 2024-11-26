import { completeTask } from "@/action/Task";
import { useTask } from "@/hooks/use-task";
import { useToast } from "@/hooks/use-toast";
import { useFile } from "@/hooks/useFile";
import { ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CSVViewer from "../csv-viewer";
import DocxViewer from "../docx-viewer";
import {
  DropFileInput,
  FileFormData,
  FileWithPreview,
} from "../drop-file-input";
import ExcelViewer from "../excel-viewer";
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

export function TaskRequirePreview({ task_id }: Props) {
  const form = useForm<FileFormData>({
    defaultValues: {
      files: [],
    },
  });

  const { mutate } = useTask(task_id);

  const [open, setOpen] = useState(false);

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
          description: "Asked preview to complete",
        });
        setOpen(false);
        mutate();
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="h-10 w-full justify-between border-dashed border-purple-500 text-purple-500"
          type="button"
        >
          Upload preview
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
              <Button onClick={onSubmit}>Submit preview</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

interface PreviewFileProps {
  file_id: number;
}

export function PreviewFile({ file_id }: PreviewFileProps) {
  const [open, setOpen] = useState(false);
  const { data: file } = useFile(file_id);

  const onSubmit = () => {};
  console.log(file?.type);

  const renderPreview = useCallback((file: FileWithPreview) => {
    const className = "w-full h-auto max-h-[70vh] object-contain";

    if (file.type.startsWith("image/")) {
      return <img src={file.preview} alt={file.name} className={className} />;
    } else if (file.type === "application/pdf") {
      return (
        <iframe
          src={file.preview}
          className="h-[70vh] w-full"
          title={file.name}
        />
      );
    } else if (file.type === "text/csv") {
      return <CSVViewer file={file} />;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <ExcelViewer file={file} />;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <DocxViewer file={file} />;
    } else {
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="mb-2 text-lg font-semibold">File Information</p>
          <p>Name: {file.name}</p>
          <p>Type: {file.type || "Unknown"}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      );
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="h-10 w-full justify-between border-dashed border-purple-500 text-purple-500"
          type="button"
        >
          Show preview
          <ChevronRight />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-[80vh] flex-col sm:max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Complete task</DialogTitle>
        </DialogHeader>
        {file &&
          renderPreview(
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          )}
        <DialogFooter>
          <Button onClick={onSubmit}>Complete task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

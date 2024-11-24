"use client";

import { completeTask } from "@/action/Task";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const fileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
  lastModified: z.number(),
  preview: z.string(),
});

const formFileSchema = z.object({
  file: fileSchema.nullable().optional(),
});

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function Page() {
  const form = useForm<z.infer<typeof formFileSchema>>({
    resolver: zodResolver(formFileSchema),
    defaultValues: {
      file: null,
    },
  });
  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        console.log(data);
        completeTask(90, data);
      })}
    >
      <input
        type="file"
        onChange={(event) => {
          const acceptedFile = event.currentTarget.files?.item(0);
          if (!acceptedFile) return;
          const newFile = {
            name: acceptedFile.name,
            type: acceptedFile.type,
            size: acceptedFile.size,
            lastModified: acceptedFile.lastModified,
            preview: URL.createObjectURL(acceptedFile),
          };
          const validFile = fileSchema.parse(newFile);
          form.setValue("file", validFile);
        }}
      />
      <button
        type="submit"
        onClick={form.handleSubmit(async (data) => {
          console.log(data);
          console.log(await completeTask(90, data));
        })}
      >
        submit
      </button>
    </form>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Download, Eye, Plus, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const CSVViewer = dynamic(() => import("./csv-viewer"), { ssr: false });
const ExcelViewer = dynamic(() => import("./excel-viewer"), { ssr: false });
const DocxViewer = dynamic(() => import("./docx-viewer"), { ssr: false });

export const fileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
  lastModified: z.number(),
  preview: z.string(),
});

export const formFileSchema = z.object({
  file: fileSchema.nullable().optional(),
});

export type FormData = z.infer<typeof formFileSchema>;

interface FileContentPreviewProps {
  form: UseFormReturn<FormData>;
}

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function FileContentPreview({ form }: FileContentPreviewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { register, setValue, watch } = form;
  const file = watch("file");

  const onDrop = useCallback(
    (acceptedFile: File | null) => {
      if (acceptedFile && allowedFileTypes.includes(acceptedFile.type)) {
        const newFile = {
          name: acceptedFile.name,
          type: acceptedFile.type,
          size: acceptedFile.size,
          lastModified: acceptedFile.lastModified,
          preview: URL.createObjectURL(acceptedFile),
        };
        const validFile = fileSchema.parse(newFile);
        setValue("file", validFile);
      } else {
        setValue("file", null);
      }
    },
    [setValue],
  );

  const removeFile = useCallback(() => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setValue("file", null);
  }, [file, setValue]);

  const handleDownload = useCallback(() => {
    if (file) {
      const link = document.createElement("a");
      link.href = file.preview;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [file]);

  const renderPreview = useCallback((file: z.infer<typeof fileSchema>) => {
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
      return <CSVViewer file={file as unknown as File} />;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <ExcelViewer file={file as unknown as File} />;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <DocxViewer file={file as unknown as File} />;
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
    <div className="flex flex-grow overflow-hidden">
      <div className="w-1/3 overflow-y-auto border-r p-4">
        <div
          onDrop={(e) => {
            e.preventDefault();
            const droppedFile = e.dataTransfer.files[0];
            onDrop(droppedFile || null);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="mb-4 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-primary"
        >
          <input
            {...register("file")}
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              onDrop(selectedFile || null);
            }}
            className="hidden"
            id="fileInput"
            accept={allowedFileTypes.join(",")}
          />
          <Label htmlFor="fileInput" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag &#39;n&#39; drop a file here, or click to select a file
            </p>
            <p className="mt-1 text-xs text-gray-500">
              (Allowed file types: Images, PDF, CSV, XLSX, DOCX)
            </p>
          </Label>
        </div>
        {file && (
          <div className="mb-2 flex items-center justify-between rounded-lg bg-gray-50 p-2">
            <span className="max-w-[60%] truncate text-sm">{file.name}</span>
            <div className="flex space-x-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setIsDialogOpen(true)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Preview {file.name}</span>
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download {file.name}</span>
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={removeFile}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove {file.name}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="w-2/3 overflow-y-auto p-4">
        {file && renderPreview(file)}
      </div>
    </div>
  );
}

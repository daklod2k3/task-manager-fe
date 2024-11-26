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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, Plus, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CSVViewer = dynamic(() => import("./csv-viewer"), { ssr: false });
const ExcelViewer = dynamic(() => import("./excel-viewer"), { ssr: false });
const DocxViewer = dynamic(() => import("./docx-viewer"), { ssr: false });

export interface FileWithPreview extends File {
  preview: string;
}

export interface FileFormData {
  files: FileWithPreview[];
}

interface FileContentPreviewProps {
  form: UseFormReturn<FileFormData>;
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

export function DropFileInput({ form }: FileContentPreviewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const { register, setValue, watch } = form;
  const files = watch("files");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter((file) =>
        allowedFileTypes.includes(file.type),
      );
      const newFiles = filteredFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setValue("files", [...files, ...newFiles]);
      if (newFiles.length > 0) {
        setActiveTab(newFiles[0].name);
      }
    },
    [files, setValue],
  );

  const removeFile = useCallback(
    (file: FileWithPreview) => {
      const newFiles = files.filter((f) => f !== file);
      setValue("files", newFiles);
      if (activeTab === file.name) {
        setActiveTab(newFiles[0]?.name || null);
      }
      URL.revokeObjectURL(file.preview);
    },
    [files, activeTab, setValue],
  );

  const handlePreview = useCallback((file: FileWithPreview) => {
    setActiveTab(file.name);
  }, []);

  const handleDownload = useCallback((file: FileWithPreview) => {
    const link = document.createElement("a");
    link.href = file.preview;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

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
    <div className="flex flex-grow overflow-hidden">
      <div className="w-1/3 overflow-y-auto border-r p-4">
        <div
          onDrop={(e) => {
            e.preventDefault();
            onDrop(Array.from(e.dataTransfer.files));
          }}
          onDragOver={(e) => e.preventDefault()}
          className="mb-4 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-primary"
        >
          <input
            {...register("files")}
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                onDrop(Array.from(files));
              }
            }}
            className="hidden"
            id="fileInput"
            multiple
            accept={allowedFileTypes.join(",")}
          />
          <Label htmlFor="fileInput" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag &#39;n&#39; drop some files here, or click to select files
            </p>
            <p className="mt-1 text-xs text-gray-500">
              (Allowed file types: Images, PDF, CSV, XLSX, DOCX)
            </p>
          </Label>
        </div>
        {files.map((file, index) => (
          <div
            key={index}
            className="mb-2 flex items-center justify-between rounded-lg bg-gray-50 p-2"
          >
            <span className="max-w-[60%] truncate text-sm">{file.name}</span>
            <div className="flex space-x-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handlePreview(file)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Preview {file.name}</span>
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleDownload(file)}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download {file.name}</span>
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeFile(file)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove {file.name}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/3 overflow-y-auto p-4">
        <Tabs value={activeTab || undefined} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {files.map((file, index) => (
              <TabsTrigger
                key={index}
                value={file.name}
                className="max-w-[200px] truncate"
              >
                {file.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {files.map((file, index) => (
            <TabsContent key={index} value={file.name} className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>File Preview</CardTitle>
                </CardHeader>
                <CardContent>{renderPreview(file)}</CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

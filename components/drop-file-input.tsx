"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Eye, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";

interface FileWithPreview extends File {
  preview: string;
}

export default function FileContentPreview() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }, []);

  const removeFile = useCallback(
    (file: FileWithPreview) => {
      const newFiles = [...files];
      newFiles.splice(newFiles.indexOf(file), 1);
      setFiles(newFiles);
      if (previewFile === file) {
        setPreviewFile(null);
        setIsDialogOpen(false);
      }
      URL.revokeObjectURL(file.preview);
    },
    [files, previewFile],
  );

  const handlePreview = useCallback((file: FileWithPreview) => {
    setPreviewFile(file);
    setIsDialogOpen(true);
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
    const className = "max-w-full max-h-[70vh] object-contain";

    if (file.type.startsWith("image/")) {
      return <img src={file.preview} alt={file.name} className={className} />;
    } else if (file.type === "application/pdf") {
      return (
        <iframe
          src={file.preview}
          className="h-full min-h-[70vh] w-full"
          title={file.name}
        />
      );
    } else if (file.type.startsWith("text/")) {
      return (
        <iframe
          src={file.preview}
          className="h-full min-h-[70vh] w-full"
          title={file.name}
        />
      );
    } else if (file.type.startsWith("video/")) {
      return <video src={file.preview} controls className={className} />;
    } else if (file.type.startsWith("audio/")) {
      return <audio src={file.preview} controls className="w-full" />;
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
    <div className="mx-auto max-w-2xl p-4">
      <div
        onDrop={(e) => {
          e.preventDefault();
          onDrop(Array.from(e.dataTransfer.files));
        }}
        onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-primary"
      >
        <input
          type="file"
          onChange={(e) => e.target.files && onDrop(Array.from(e.target.files))}
          className="hidden"
          id="fileInput"
          multiple
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold">Uploaded Files</h2>
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
            >
              <span className="truncate text-sm">{file.name}</span>
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handlePreview(file)}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview {file.name}</span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDownload(file)}
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download {file.name}</span>
                </Button>
                <Button
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
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {previewFile && renderPreview(previewFile)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

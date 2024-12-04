import mammoth from "mammoth";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

interface DocxViewerProps {
  file: File;
}

export default function DocxViewer({ file }: DocxViewerProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setContent(result.value);
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  return (
    <Card className="prose max-w-full overflow-x-auto bg-gray-200">
      <CardContent className="p-10">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
    </Card>
  );
}

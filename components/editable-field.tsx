import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Textarea, TextareaProps } from "./ui/textarea";

interface Props {
  value?: string | null;
  inputProps?: TextareaProps;
  className?: string;
  placeholder?: string;
}

export default function EditableField({
  placeholder,
  value,
  inputProps,
  className,
  ...props
}: Props) {
  const [data, setData] = useState(value || "");
  const [change, setChange] = useState<string>(data);
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit)
    return (
      <div className="grid space-y-3 rounded">
        <Textarea
          disabled
          {...inputProps}
          placeholder="type your value here"
          defaultValue={change}
          className={cn(className, "text-wrap")}
        />
        <div className="space-x-2 justify-self-end">
          <Button>Save</Button>
          <Button variant="ghost" onClick={() => setIsEdit(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );

  return (
    <Button
      variant={"ghost"}
      className={cn("h-fit w-full min-w-0 max-w-full cursor-text", className)}
      onClick={() => {
        setIsEdit(true);
        setChange(data);
      }}
    >
      <ScrollArea className={cn(className, "grid h-full w-full")}>
        <p className={"h-max text-wrap break-all text-left text-lg"}>
          {value || (placeholder ?? "Click to edit value")}
        </p>
      </ScrollArea>
    </Button>
  );
}

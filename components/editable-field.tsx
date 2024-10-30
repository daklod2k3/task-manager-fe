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
      <div className="flex gap-2 rounded">
        <Textarea
          {...inputProps}
          placeholder={placeholder}
          defaultValue={change}
          className={cn(className, "w-full text-wrap")}
        />
        <div className="flex flex-col">
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
          {value || (
            <span className="text-muted-foreground">
              {placeholder ?? "Click to edit value"}
            </span>
          )}
        </p>
      </ScrollArea>
    </Button>
  );
}

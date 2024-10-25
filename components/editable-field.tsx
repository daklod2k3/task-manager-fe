import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea, TextareaProps } from "./ui/textarea";

interface Props {
  value?: string | null;
  inputProps?: TextareaProps;
  className?: string;
}

export default function EditableField({
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
      className={cn(
        "flex min-w-0 max-w-full cursor-text text-wrap break-all text-left text-lg",
        className,
      )}
      onClick={() => {
        setIsEdit(true);
        setChange(data);
      }}
    >
      {/* <p className={"grid min-w-0 text-wrap"}> */}
      {value || "Click to edit value"}
      {/* </p> */}
    </Button>
  );
}

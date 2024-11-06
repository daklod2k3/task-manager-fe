import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import React from "react";
import MyAvatar from "../Avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function CommentInput({ className, ...props }: Props) {
  return (
    <div
      className={cn("grid grid-cols-[auto,1fr,auto] gap-3", className)}
      {...props}
    >
      <MyAvatar />
      <Textarea className="" placeholder="your comment here"></Textarea>
      <Button>Send</Button>
    </div>
  );
}

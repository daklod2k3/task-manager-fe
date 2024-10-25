import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import React, { ComponentProps } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Props extends ComponentProps<typeof Avatar> {
  imgSrc?: string;
  name: string;
  size?: number
}

export default function MyAvatar({ imgSrc, name, size, className, ...props }: Props) {
  
  const sizeClass = size ? `size-${size}` : undefined
  
  return (
    <Avatar {...props} className={cn(sizeClass, className)}>
      <AvatarImage src={imgSrc || "/image/avatar.avif"}/>
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}

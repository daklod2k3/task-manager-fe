import { Tables } from "@/entity/database.types";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import React, { ComponentProps } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Props extends ComponentProps<typeof Avatar> {
  size?: number;
  user?: Tables<"profiles">;
}

export default function MyAvatar({ user, size, className, ...props }: Props) {
  const sizeClass = size ? `size-${size}` : undefined;

  return (
    <Avatar {...props} className={cn(sizeClass, className)}>
      <AvatarImage
        src={
          "/image/avatar/" +
          (user ? user.avt || "avatar.avif" : "null-user.png")
        }
      />
      <AvatarFallback>{user?.name || "User not found"}</AvatarFallback>
    </Avatar>
  );
}

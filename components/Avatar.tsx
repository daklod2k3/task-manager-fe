import { Tables } from "@/entity/database.types";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import React, { ComponentProps } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Props extends ComponentProps<typeof Avatar> {
  size?: number;
  user?: Tables<"profiles">;
}

export default function MyAvatar({ user, size, className, ...props }: Props) {
  const sizeClass = size ? `size-${size}` : undefined;
  const { data: localUser, isLoading } = useUser();

  const data = user || localUser;

  return (
    <Avatar {...props} className={cn(sizeClass, className, "relative z-10")}>
      <AvatarImage
        src={
          "/image/avatar/" +
          (data ? data.avt || "avatar.avif" : "null-user.png")
        }
      />
      {isLoading && <Loader2 className="animate-spin" />}
      <AvatarFallback>{data?.name || "User not found"}</AvatarFallback>
    </Avatar>
  );
}

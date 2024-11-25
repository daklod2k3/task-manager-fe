import { Tables } from "@/entity/database.types";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import React, { ComponentProps } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface Props extends ComponentProps<typeof Avatar> {
  size?: number;
  user?: Tables<"profiles">;
  includeInfo?: boolean;
}

export default function MyAvatar({
  user,
  size,
  className,
  includeInfo,
  ...props
}: Props) {
  const sizeClass = size ? `size-${size}` : undefined;
  const { data: localUser, isLoading } = useUser();

  const data = localUser || user;

  return (
    <div className="flex items-center gap-2">
      <Avatar
        {...props}
        className={cn(
          sizeClass,
          className,
          // "relative z-10"
        )}
      >
        {data && (
          <AvatarImage
            src={
              "/image/avatar/" +
              (data ? data.avt || "avatar.avif" : "null-user.png")
            }
          />
        )}
        {isLoading && <Loader2 className="animate-spin" />}

        <AvatarFallback>{data?.name || "User not found"}</AvatarFallback>
      </Avatar>
      {includeInfo && (
        <div className="grid gap-1 font-semibold text-primary">
          {data?.name}
          <Badge className="w-fit">{data?.role_name}</Badge>
        </div>
      )}
    </div>
  );
}

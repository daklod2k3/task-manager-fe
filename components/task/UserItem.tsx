import MyAvatar from "@/components/Avatar";
import HoverInfo from "@/components/HoverInfo";
import { Tables } from "@/entity/database.types";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  user: Tables<"profiles"> | null;
  className?: string;
  size?: number;
  onClick?: React.MouseEventHandler<HTMLSpanElement>
}

export default function UserItem({ user, className, size, onClick }: Props) {
  const label = user?.name ?? "not assigned";
  const src = "/image/avatar/" + (user?.avt ?? "null-user.png");
  const name = user?.name ?? "none";
  return (
    <HoverInfo label={label}>
      <MyAvatar name={name} onClick={onClick} imgSrc={src} size={size} className={className} />
    </HoverInfo>
  );
}

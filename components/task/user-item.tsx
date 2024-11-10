import MyAvatar from "@/components/Avatar";
import HoverInfo from "@/components/HoverInfo";
import { Tables } from "@/entity/database.types";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  user: Tables<"profiles">;
  className?: string;
  size?: number;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

class User implements Tables<"profiles"> {
  avt: string | null;
  bio: string | null;
  id: string;
  name: string;

  constructor({ id, name, bio, avt }) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.avt = avt;
  }
}

export default function UserItem({ user, className, size, onClick }: Props) {
  const label = user?.name ?? "not assigned";
  const src = "/image/avatar/" + (user?.avt ?? "null-user.png");
  const name = user?.name ?? "none";
  return (
    <HoverInfo onClick={onClick} label={label}>
      <div>
        <MyAvatar user={user} size={size} className={className} />
      </div>
    </HoverInfo>
  );
}

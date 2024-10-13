import MyAvatar from "@/components/Avatar";
import HoverInfo from "@/components/HoverInfo";
import { Tables } from "@/entity/database.types";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  user: Tables<"profiles">;
  className?: string;
}

export default function UserItem({ user, className }: Props) {
  return (
    <HoverInfo label={user.name}>
      <MyAvatar
        name={user.name}
        imgSrc={"/image/avatar/" + user.avt}
        className={className}
      />
    </HoverInfo>
  );
}

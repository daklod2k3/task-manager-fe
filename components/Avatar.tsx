import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function MyAvatar({
  imgSrc,
  name,
}: {
  imgSrc: string;
  name: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={imgSrc} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}

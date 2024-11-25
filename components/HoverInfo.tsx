import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Tables } from "@/database.types";
import { usePeople } from "@/hooks/use-people";
import React, { ReactElement } from "react";
import MyAvatar from "./Avatar";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface Props {
  children?: React.ReactNode;
  label: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  className?: string;
  user?: Tables<"profiles">;
}

export default function HoverInfo({ children, user }: Props) {
  const {} = usePeople();
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="flex gap-2">
        <MyAvatar user={user} />
        <Badge className="h-fit">{user?.name}</Badge>
      </HoverCardContent>
    </HoverCard>
  );
}

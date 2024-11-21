import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React, { ReactElement } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface Props {
  children?: React.ReactNode;
  label: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  className?: string;
}

export default function HoverInfo({
  children,
  label,
  onClick,
  className,
}: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {/* <TooltipTrigger className={className} asChild> */}
        {children}
        {/* </TooltipTrigger> */}
      </HoverCardTrigger>
      <HoverCardContent>
        <p>{label}</p>
      </HoverCardContent>
    </HoverCard>
  );
}

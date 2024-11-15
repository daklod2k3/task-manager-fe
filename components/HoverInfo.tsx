import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React, { ReactElement } from "react";

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

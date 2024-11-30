import { cn } from "@/lib/utils";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string;
  onValueChange?: (value: boolean) => void;
}

export default function ToggleFilter({
  onValueChange,
  className,
  label,
}: Props) {
  const [value, setValue] = useState(false);
  useEffect(
    () => onValueChange && onValueChange(value),
    [value, onValueChange],
  );
  const iconClassName = `${label && "ml-2"} w-4 h-4`;
  return (
    <Button
      variant="outline"
      className={cn("w-fit", className)}
      onClick={() => setValue(!value)}
    >
      {label}
      {value ? (
        <ArrowDownNarrowWide className={iconClassName} />
      ) : (
        <ArrowUpNarrowWide className={iconClassName} />
      )}
    </Button>
  );
}

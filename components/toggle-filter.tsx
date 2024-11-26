import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

interface Props {
  onChange: (value: boolean) => void;
  label?: string;
}

export default function ToggleFilter({ onChange, label }: Props) {
  const [value, setValue] = useState(false);
  useEffect(() => onChange(value), [value, onChange]);
  const iconClassName = `${label && "ml-2"} w-4 h-4`;
  return (
    <Button
      variant="outline"
      className="w-fit"
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

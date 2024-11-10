import { Loader2 } from "lucide-react";
import React from "react";

interface Props {
  size?: number;
}

export default function Loading({ size = 50 }: Props) {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={size} />
    </div>
  );
}

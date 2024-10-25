import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={50} />
    </div>
  );
}

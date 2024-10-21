import { Loader2 } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="size-full flex justify-center items-center">
      <Loader2 className="animate-spin text-primary" size={50} />
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

export default function SearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="items-center flex relative">
      <Search className="h-4 w-4 ml-2 absolute" />
      <Input
        type="search"
        placeholder="Search..."
        className={cn("w-72 pl-7 bg-white/50", className)}
        {...props}
      />
    </div>
  );
}

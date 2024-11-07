import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

export default function SearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative flex items-center">
      <Search className="absolute ml-2 h-4 w-4" />
      <Input
        type="search"
        placeholder="Search..."
        className={cn("w-72 bg-white/50 pl-7", className)}
        {...props}
      />
    </div>
  );
}

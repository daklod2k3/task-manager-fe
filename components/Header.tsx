import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <div className="flex flex-row justify-center">
      <div className="p-1 items-center flex relative">
        <Search className="h-4 w-4 ml-2 absolute" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-72 pl-7 bg-secondary"
        />
      </div>
    </div>
  );
}

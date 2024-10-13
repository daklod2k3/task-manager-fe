import { Search } from "lucide-react";
import React from "react";
import SearchInput from "./SearchInput";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <div className="flex flex-row justify-center p-1">
      <SearchInput />
    </div>
  );
}

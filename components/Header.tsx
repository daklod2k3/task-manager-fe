"use client";
import { useUser } from "@/hooks/use-user";
import { Search } from "lucide-react";
import React from "react";
import MyAvatar from "./Avatar";
import SearchInput from "./SearchInput";
import { Input } from "./ui/input";

export default function Header() {
  const { data: user } = useUser();
  return (
    <div className="flex flex-row justify-center p-1">
      <SearchInput className="m-auto" />
      <div className="ml-auto">
        <MyAvatar />
        <p>{}</p>
      </div>
    </div>
  );
}

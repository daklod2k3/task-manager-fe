"use client";
import { logout } from "@/action/Auth";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { ChevronDown, Search, User2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import MyAvatar from "./Avatar";
import SearchInput from "./SearchInput";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Header() {
  // const { data: user, isLoading, error } = useUser();
  // const { toast } = useToast();
  // console.log(user);

  return (
    <div className="flex flex-row justify-between p-1">
      <div className="flex flex-1 justify-center">
        <SearchInput />
      </div>
      {/* {!isLoading && user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded px-3 text-primary-foreground">
            <MyAvatar user={user} size={7} />
            <p>{user.name}</p>
            <ChevronDown size={17} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex w-full flex-col">
            <DropdownMenuItem
              onClick={async () => {
                // const res = await logout();
                // if (res)
                //   toast({
                //     title: "Logout failed",
                //     description: res?.error || "An error occurred",
                //     variant: "destructive",
                //   });
              }}
            >
              <Link href={"/logout"}>Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )} */}
    </div>
  );
}

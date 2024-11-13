"use client";
import { logout } from "@/action/Auth";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { Search, User2 } from "lucide-react";
import React from "react";
import MyAvatar from "./Avatar";
import SearchInput from "./SearchInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Header() {
  const { data: user, isLoading, error } = useUser();
  const { toast } = useToast();
  // console.log(user);

  return (
    <div className="flex flex-row justify-between p-1">
      <div className="flex flex-1 justify-center">
        <SearchInput />
      </div>
      {!isLoading && user && (
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 rounded px-3 text-foreground">
            <User2 />
            <p>{user.name}</p>
          </PopoverTrigger>
          <PopoverContent className="flex w-full flex-col">
            <Button
              onClick={async () => {
                const res = await logout();
                if (res)
                  toast({
                    title: "Logout failed",
                    description: res?.error || "An error occurred",
                    variant: "destructive",
                  });
              }}
            >
              Log out
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

"use client";

import { Loader2  } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

import Avatar from "@/components/Avatar"
import { Tables } from "@/entity/database.types";
import {usePeople} from "@/hooks/use-people";

export default function UserList() {
  const userFetch = usePeople();
  const [users, setUsers] = useState<Tables<"profiles">[]>([]);

  useEffect(() => {
    if (userFetch.data) {
      setUsers(userFetch.data);
    }
  }, [userFetch.data]);


  const cardUser = (name: string,user?: Tables<"profiles">) => {
    return (
      <div
        className="flex flex-col items-center cursor-pointer bg-white rounded shadow flex-1 basis-1/4 h-36 max-w-56 scroll-ml-1"
        onClick={() => alert("show profile " + name)}>
        <div className="basis-3/6 flex items-center">
          <Avatar size={14} user={user} />
        </div>
        <p className="basis-1/6 my-1 ">{name}</p>
      </div>
    )
  };

  return (
    <div className="flex flex-wrap gap-3 w-full max-h-80 overflow-y-scroll bg-primary/10 pl-3 py-2 rounded">
      {userFetch.isLoading ?
        <div className="w-full flex items-center justify-center">
          <Button disabled className="h-24 w-56">
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        </div> : users.map((user) => cardUser(user.name,user))
      }
    </div>
  )
}

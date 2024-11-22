"use client";

import React, { useState, useEffect } from "react";
import { usePeople } from "@/hooks/use-people";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import Link from "next/link";
import { Button } from "../ui/button";

function AddPeopleForDept( { idDept } : {idDert?:number}){
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const userFetch = usePeople();
  const [user, setUser] = useState<any[]>([]);

    const addPeopleDept = () => {
        
    }

    const fifterUser = () => {
        
    }

  useEffect(() => {
    if (userFetch.data) {
        setUser(userFetch.data);
    }
  }, [userFetch.data]);

  return (
    <Command className="rounded-lg border shadow-md relative overflow-visible">
      <CommandInput
        placeholder="Add people"
        value={inputValue}
        onValueChange={(value) => {
          setInputValue(value);
          setIsInputActive(value.trim() !== "");
        }}
      />
      <CommandList className={isInputActive ? "absolute w-full top-full rounded shadow bg-white z-30" : "hidden"}>
        <CommandEmpty>Employee name not found</CommandEmpty>
        {user.map((user) => (
          <React.Fragment key={user.id}>
            <CommandItem>
              <Button onClick={() => {addPeopleDept()}} className="text-start w-full bg-primary/80">
                {user.name}
              </Button>
            </CommandItem>
            <CommandSeparator />
          </React.Fragment>
        ))}
      </CommandList>
    </Command>
  );
};

export default AddPeopleForDept;
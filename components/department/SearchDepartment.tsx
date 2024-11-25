"use client";

import React, { useState, useEffect } from "react";
import { Tables } from "@/entity/database.types";
import { useDepartmentContext } from "@/context/department-context";

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

interface CommandClickItemProps {
  onClickItem?: (id:number) => void;
}

const SearchUser: React.FC<CommandClickItemProps> = ({ onClickItem }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const {departmentAllFetch} = useDepartmentContext();
  const [depa, setDepa] = useState<any[]>([]);

  useEffect(() => {
    if (departmentAllFetch.data) {
      setDepa(departmentAllFetch.data);
    }
  }, [departmentAllFetch.data]);

  return (
    <Command className="rounded-lg border shadow-md relative overflow-visible">
      <CommandInput
        placeholder="search department..."
        value={inputValue}
        onValueChange={(value) => {
          setInputValue(value);
          setIsInputActive(value.trim() !== "");
        }}
      />
      <CommandList className={isInputActive ? "absolute w-full top-full rounded shadow bg-white z-30" : "hidden"}>
        <CommandEmpty>Employee name not found</CommandEmpty>
        {depa.map((user) => (
          <React.Fragment key={user.id}>
            <CommandItem>
              <Button className="text-start w-full bg-primary/80">
                <Link href={"/department/" + user.id}>{user.name}</Link>
              </Button>
            </CommandItem>
            <CommandSeparator />
          </React.Fragment>
        ))}
      </CommandList>
    </Command>
  );
};

export default SearchUser;
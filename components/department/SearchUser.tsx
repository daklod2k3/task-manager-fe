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

interface CommandClickItemProps {
  onClickItem?: () => void;
  onAddUserToTeam?: (teamID: number, name: string) => void;
}

const SearchUser: React.FC<CommandClickItemProps> = ({ onClickItem, onAddUserToTeam }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const search = new URLSearchParams(window.location.search);
  const [currTeam, setCurrTeam] = useState(0);
  const { userFetch } = useDepartmentContext();
  const [users, setUsers] = useState<Tables<"profiles">[]>([]);

  useEffect(() => {
    if (userFetch.data) {
      setUsers(userFetch.data);
    }
  }, [userFetch.data]);

  useEffect(() => {
    const departmentId = Number(search.get("department_id"));
    if(departmentId) {
      setCurrTeam(departmentId)
    }
  }, [search]);

  return (
    <Command className="rounded-lg border shadow-md relative overflow-visible">
      <CommandInput
        placeholder="search user..."
        value={inputValue}
        onValueChange={(value) => {
          setInputValue(value);
          setIsInputActive(value.trim() !== "");
        }}
      />
      <CommandList className={isInputActive ? "absolute w-full top-full rounded shadow bg-white z-30" : "hidden"}>
        <CommandEmpty>Employee name not found</CommandEmpty>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <CommandItem>
              <button 
                className="text-start w-full" 
                onClick={() => {
                  setInputValue("");
                  setIsInputActive(false);
                  onClickItem && onClickItem();
                  onAddUserToTeam && onAddUserToTeam(currTeam, user.name);
                }}
              >
                {user.name}
              </button>
            </CommandItem>
            <CommandSeparator />
          </React.Fragment>
        ))}
      </CommandList>
    </Command>
  );
};

export default SearchUser;
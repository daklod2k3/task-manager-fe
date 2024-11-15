import MyAvatar from "@/components/Avatar";
import HoverInfo from "@/components/HoverInfo";
import { Tables } from "@/entity/database.types";
import { usePeople } from "@/hooks/use-people";
import { cn } from "@/lib/utils";
import { Circle, CirclePlus, UserPlus2, X } from "lucide-react";
import React, { useState } from "react";
import SearchSelect from "../search-select";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  currentUsers: Tables<"profiles">[];
}

interface ISearchItem<T> {
  value: T;
  label: string;
  search: string;
  type: string;
}

function PeopleSearchItem<T extends Tables<"profiles">>({ item }: { item: T }) {
  return (
    <div className="flex size-full min-w-0 items-center gap-2 text-foreground hover:text-primary">
      <MyAvatar user={item} />
      <p className="break-all">{item.name}</p>
    </div>
  );
}

export default function UserItem({ currentUsers }: Props) {
  const { data: users } = usePeople();

  const itemsUser = users?.map<ISearchItem<Tables<"profiles">>>((user) => ({
    value: user,
    label: user.name,
    search: user.name,
    type: "user",
  }));

  const [userSelected, setUserSelected] =
    useState<Tables<"profiles">[]>(currentUsers);

  // const itemDepartment =

  const removeAssignee = (user: Tables<"profiles">) => {
    setUserSelected((prev) => prev.filter((x) => x.id !== user.id));
  };

  const AssigneeSelected = ({ items }: { items: any[] }) => (
    <div className="flex flex-wrap gap-1">
      {items.map((x) => (
        <Badge key={x.id} className="flex gap-1 p-1">
          <MyAvatar user={x} size={7} />
          {x.name}
          <X
            size={18}
            className="cursor-pointer rounded-full hover:bg-white hover:text-primary"
            onClick={() => removeAssignee(x)}
          />
        </Badge>
      ))}
    </div>
  );

  return (
    // <HoverInfo className="cursor-pointer" onClick={onClick} label={label}>
    <Popover>
      <PopoverTrigger>
        {userSelected.length > 0 && <AssigneeSelected items={userSelected} />}
        <CirclePlus className="rounded-full opacity-50 hover:opacity-100" />
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput />
          <CommandList>
            {itemsUser?.map((item) => {
              if (item.type === "user")
                return (
                  <CommandItem
                    key={item.value.id}
                    onSelect={() =>
                      setUserSelected((prev) => [...prev, item.value])
                    }
                  >
                    <PeopleSearchItem item={item.value} />
                  </CommandItem>
                );
            })}
            {itemsUser?.length === 0 && <CommandEmpty />}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    // </HoverInfo>
  );
}

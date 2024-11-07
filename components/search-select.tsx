import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import { Tables } from "@/entity/database.types";
import React, { useMemo } from "react";
import MyAvatar from "./Avatar";
import { Input } from "./ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";

export function PeopleSearchItem<T extends Tables<"profiles">>({
  item,
}: {
  item: T;
}) {
  return (
    <div className="flex h-full w-full flex-wrap">
      <MyAvatar user={item} />
      {item.name}
    </div>
  );
}

export interface ISearchItem<T> {
  value: T;
  label: string;
  search: string;
}

interface SearchSelectProps<T> {
  items: ISearchItem<T>[];
  onSelectedValueChange: (value: T) => void;
  isLoading?: boolean;
  ItemRender?: React.FC<{ item: T }>;
  modal?: boolean;
}

export default function SearchSelect<T>({
  items,
  isLoading = false,
  onSelectedValueChange,
  modal = false,
  ItemRender,
}: SearchSelectProps<T>) {
  const [searchValue, setSearchValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // const labels = useMemo(
  //   () =>
  //     items.reduce(
  //       (acc, item) => {
  //         acc[item.value] = item.label;
  //         return acc;
  //       },
  //       {} as Record<string, string>,
  //     ),
  //   [items],
  // );

  // const reset = () => {
  //   onSelectedValueChange("" as T);
  //   onSearchValueChange("");
  // };

  // const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   if (
  //     !e.relatedTarget?.hasAttribute("cmdk-list") &&
  //     labels[selectedValue] !== searchValue
  //   ) {
  //     reset();
  //   }
  // };

  // const onSelectItem = (inputValue: string) => {
  //   if (inputValue === selectedValue) {
  //     reset();
  //   } else {
  //     onSelectedValueChange(inputValue as T);
  //     onSearchValueChange(labels[inputValue] ?? "");
  //   }
  //   setOpen(false);
  // };

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.search.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [items, searchValue]);

  const onSelected = (item: T) => {
    setOpen(false);
    onSelectedValueChange(item);
  };

  return (
    <div className="flex items-center">
      <Popover open={open} modal={modal} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={setSearchValue}
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
              // onBlur={onInputBlur}
            >
              <Input />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList className="max-h-52 min-h-0" asChild>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {filteredItems.length > 0 && !isLoading ? (
                filteredItems.map((item) => (
                  <CommandItem
                    key={item.search}
                    onClick={() => onSelected(item.value)}
                  >
                    {ItemRender ? <ItemRender item={item.value} /> : item.label}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>No items found</CommandEmpty>
              )}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}

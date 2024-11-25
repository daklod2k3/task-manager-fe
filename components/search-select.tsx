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
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Loader2, Search } from "lucide-react";
import React, { useMemo } from "react";
import MyAvatar from "./Avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Skeleton } from "./ui/skeleton";

export function PeopleSearchItem<T extends Tables<"profiles">>({
  item,
}: {
  item: T;
}) {
  return (
    <div className="flex size-full min-w-0 items-center gap-2 text-foreground hover:text-primary">
      <MyAvatar user={item} />
      <p className="break-all">{item.name}</p>
    </div>
  );
}

export interface ISearchItem<T> {
  value: T;
  label: string;
  search: string;
}

interface SearchSelectProps<T> {
  items: ISearchItem<any>[];
  onSelectedValueChange: (value: T) => void;
  isLoading?: boolean;
  modal?: boolean;
  variant?: "people" | "custom";
  inputClassName?: string;
  placeholder?: string;
  disable?: boolean;
  CustomTrigger?: React.FC;
}

export default function SearchSelect<T>({
  disable = false,
  items,
  isLoading = false,
  onSelectedValueChange,
  modal = false,
  placeholder,
  CustomTrigger,
  variant = "people",
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

  const ItemRender = (props) => {
    switch (variant) {
      case "people":
        return <PeopleSearchItem {...props} />;
    }
    return;
  };

  return (
    <div className="flex items-center">
      <Popover open={open} modal={modal} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* <div className="relative flex items-center"> */}
          {CustomTrigger ? (
            <CustomTrigger />
          ) : (
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disable}
              className="w-[200px] justify-between border-dashed border-sky-500 text-sky-500"
              type="button"
            >
              {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."} */}
              {placeholder || "Select..."}
              {isLoading ? (
                <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          )}
          {/* <Search className="absolute ml-2 h-4 w-4" />
              <CommandPrimitive.Input
                disabled={disable}
                asChild
                value={searchValue}
                onValueChange={setSearchValue}
                onKeyDown={(e) => setOpen(e.key !== "Escape")}
                onMouseDown={() => setOpen((open) => !!searchValue || !open)}
                onFocus={() => setOpen(true)}
                // onBlur={onInputBlur}
              >
                <Input
                  className={cn("bg-white/50 pl-7", inputClassName)}
                  placeholder={placeholder}
                  disabled={isLoading}
                />
              </CommandPrimitive.Input> */}
          {/* </div> */}
        </PopoverTrigger>
        {/* {!open && <CommandList aria-hidden="true" className="hidden" />} */}
        <PopoverContent
          asChild
          onInteractOutside={(e) => {
            if (
              e.target instanceof Element &&
              e.target.hasAttribute("cmdk-input")
            ) {
              e.preventDefault();
            }
          }}
          className="max-h-52 min-h-0 w-[--radix-popover-trigger-width] p-0"
        >
          <Command shouldFilter={false}>
            <CommandInput
              disabled={disable}
              // asChild
              value={searchValue}
              onValueChange={setSearchValue}
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
              // onBlur={onInputBlur}
            >
              {/* <Input
                className={cn("bg-white/50 pl-7", inputClassName)}
                placeholder={placeholder}
                disabled={isLoading}
              /> */}
            </CommandInput>
            <CommandList asChild>
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
                    className="cursor-pointer"
                    key={item.search}
                    onSelect={() => {
                      // console.log("click");
                      onSelected(item.value);
                    }}
                  >
                    {ItemRender ? <ItemRender item={item.value} /> : item.label}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>No items found</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

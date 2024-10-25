import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Props {
  itemList: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
  title?: string;
}

export default function FilterSelection({
  itemList,
  defaultValue,
  title,
}: Props) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]" defaultValue={defaultValue}>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {itemList.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

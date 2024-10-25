import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  Equal,
} from "lucide-react";
import HoverInfo from "../HoverInfo";

export const DueDateRender = ({ date }: { date: Date }) => {
  const dayDiff = (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  // console.log(dayDiff);

  let color = "";
  if (dayDiff < 0) color = "red-500";
  else if (dayDiff > 2) color = "green-500";
  else color = "orange-500";
  const timeStr =
    Math.abs(dayDiff) > 1
      ? `${Math.floor(Math.abs(dayDiff))} days`
      : `${Math.abs(dayDiff) * 24}h`;
  return (
    <span className={cn("text-" + color)}>
      {dayDiff < 0 ? `Overdue (${timeStr} ago)` : timeStr + " days left"}
    </span>
  );
};

export const PriorityIcon = ({ priority }: { priority: string }) => {
  const Icon = () => {
    switch (priority) {
      case "high":
        return <ChevronsUp className="text-red-500" />;
      case "medium":
        return <Equal className="text-orange-500" />;
      case "low":
        return <ChevronsDown className="text-green-500" />;
    }
  };

  return (
    <HoverInfo label={priority + " priority"}>
      <Icon />
    </HoverInfo>
  );
};

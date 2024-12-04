import { Filter, FilterOperators, RootFilter } from "@/action/Api";
import useTaskHistory from "@/hooks/use-task-history";
import { cn, FormatTime } from "@/lib/utils";
import React from "react";
import Markdown from "react-markdown";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

const strongColor = {
  Low: "green-500",
  Medium: "yellow-500",
  High: "red-500",
  To_do: "sky-500",
  In_progress: "blue-500",
  Qa: "purple-500",
  In_preview: "orange-500",
  Done: "green-500",
};

interface Props {
  task_id: number;
}

export default function TaskHistory({ task_id }: Props) {
  const filter = new RootFilter({
    Filters: [
      new Filter({
        Field: "TaskId",
        Operator: FilterOperators.eq,
        Value: task_id,
      }),
    ],
  });
  const { data, isLoading, error } = useTaskHistory({
    includes: "User",
    search: new URLSearchParams({ filter: JSON.stringify(filter) }).toString(),
  });
  console.log(data);

  if (error) return <div className="text-red-500">Data load error</div>;

  return (
    <ScrollArea>
      <div className="space-y-2">
        {isLoading && <Skeleton className="h-16 w-full" />}
        {data?.map((item: any) => (
          <div key={item.id} className="w-full rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <Badge
                // className={`bg-${ColumnTitles.find((x) => x.title.toLowerCase() == item.status.toLowerCase())?.color}`}
                className="bg-sky-500"
              >
                {item?.user.name}
              </Badge>
              <Markdown
                components={{
                  strong: ({ children }) => (
                    <span
                      className={cn(
                        "font-semibold",
                        ` text-${strongColor[String(children)] || "primary"}`,
                      )}
                    >
                      {String(children).replaceAll("_", " ")}
                    </span>
                    // <span className="font-semibold text-primary">
                    //   {String(children).replaceAll("_", " ")}
                    // </span>
                  ),
                }}
              >
                {item?.description}
              </Markdown>

              <span className="text-sm text-muted-foreground">
                {item?.created_at &&
                  new Date(item.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
              </span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {FormatTime(item?.created_at)}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

"use client";
import { Filter } from "@/action/Api";
import { updateStatus, updateTask } from "@/action/Task";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTaskContext } from "@/context/task-context";
import { Tables } from "@/entity/database.types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../Loading";
import LoadingDialog from "../loading/LoadingDialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import TaskCard from "./task-card";

// const Container = styled.div`
//   display: flex;
// `;

// const TaskList = styled.div`
//   min-height: 100px;
//   display: flex;
//   flex-direction: column;
//   background: #f3f3f3;
//   min-width: 341px;
//   border-radius: 5px;
//   padding: 15px 15px;
//   margin-right: 45px;
// `;

// const TaskColumnStyles = styled.div`
//   margin: 8px;
//   display: flex;
//   width: 100%;
//   min-height: 80vh;
// `;

// const Title = styled.span`
//   color: #10957d;
//   background: rgba(16, 149, 125, 0.15);
//   padding: 2px 10px;
//   border-radius: 5px;
//   align-self: flex-start;
// `;

interface Props {
  taskList: Tables<"tasks">[];
}

interface ITableColumn {
  [key: string]: {
    items: Tables<"tasks">[];
    title: string;
    color: string;
  };
}

export const ColumnTitles = [
  { title: "To_do", color: "sky-500" },
  { title: "In_Progress", color: "blue-500" },
  { title: "QA", color: "purple-500" },
  { title: "In_Preview", color: "orange-500" },
  // "In_Complete",
  { title: "Done", color: "green-500" },
  // "Archived",
];

const dataToColumn = (taskList: Tables<"tasks">[]) => {
  let filter = taskList;

  const result: ITableColumn = {};
  for (const { title, color } of ColumnTitles) {
    result[title] = {
      title,
      items: [],
      color,
    };
    filter = filter.filter((item) => {
      if (
        item.status.toLocaleLowerCase() ==
        title.toLocaleLowerCase().replaceAll(" ", "_")
      )
        result[title].items.push(item);
      else return item;
    });
    result[title].items = sortData(result[title].items);
  }

  return result;
};

const sortData = (taskList: Tables<"tasks">[]) => {
  return taskList.sort(
    (a, b) => {
      // const x = new Date(a.due_date || "").getTime() - new Date().getTime();
      // const y = new Date(b.due_date || "").getTime() - new Date().getTime();
      // if (x < 0 || y < 0) {
      //   return -1;
      // }
      return (
        new Date(a.due_date || "").getTime() -
        new Date(b.due_date || "").getTime()
      );
    },

    // new Date(a.due_date || "").getTime() -
    // new Date(b.due_date || "").getTime(),
  );
};

const Kanban = () => {
  const {
    taskFetch: useTask,
    taskFilter: [filter],
    department_id,
  } = useTaskContext();
  const [columns, setColumns] = useState<ReturnType<typeof dataToColumn> | []>(
    [],
  );

  const [search, setSearch] = useState(new URLSearchParams());

  const {
    data: taskList,
    isLoading: taskLoading,
    mutate,
    error,
  } = useTask({
    // filter: search.toString(),
    department_id,
  });

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  console.log(taskList);

  useEffect(() => {
    console.log("mutate");

    setColumns(dataToColumn(taskList || []));
  }, [taskList]);

  useEffect(() => {
    setLoading((l) => l && taskLoading);
    // if (!taskLoading) setColumns(dataToColumn(taskList || []));
  }, [taskLoading]);

  useEffect(() => {
    if (filter?.filter)
      search.set("filter", JSON.stringify({ filters: [filter?.filter] }));
    else search.delete("filter");
    setSearch(search);
    // console.log("mutate");
  }, [filter, search, mutate]);

  const onDragEnd = async (
    result: any,
    columns: any,
    setColumn: any,
    setLoading: any,
  ) => {
    // console.log(result, columns, setColumn);

    if (!result.destination) return;
    const { source, destination } = result;
    if (
      destination.droppableId == "Done" ||
      destination.droppableId == "In_Preview"
    ) {
      toast({
        title: "Action can't be done",
        description: "Please open task detail for this action",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // updateTask()
    // mutate(undefined, { revalidate: true });
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);
      await setColumn({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: sortData(destItems),
        },
      });

      const result = await updateStatus(removed.id, destination.droppableId);
      console.log(result);
      if (result.status != 200) {
        await setColumn({
          ...columns,
        });
      }
      setLoading(false);
    }
    //  else {
    //   const column = columns[source.droppableId];
    //   const copiedItems = [...column.items];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   const result = await updateTask({
    //     ...removed,
    //     status: destination.droppableId,
    //   });
    //   if (!result) {
    //     setLoading(false);
    //   }
    //   await setColumn({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: sortData(copiedItems),
    //     },
    //   });
    // }
  };

  if (taskLoading) return <Loading />;
  if (error)
    return <span className="font-bold text-red-500">{error.message}</span>;
  if (taskList?.length == 0 || !taskList) return <span>No tasks found</span>;

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          const { source, destination } = result;
          if (source.droppableId === destination.droppableId) return;
          onDragEnd(result, columns, setColumns, setLoading);
          // setLoading(false);
        }}
      >
        <LoadingDialog open={loading} />
        <ScrollArea className="grid pb-3 pr-3">
          <div className="grid h-max w-max grid-flow-col gap-5">
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className={cn("grid grid-rows-[auto,1fr]")} key={columnId}>
                  <div className="sticky top-0 z-50 mb-3 bg-white">
                    <div
                      className={cn(
                        "relative border-t-4 px-3",
                        `border-${column.color} bg-${column.color} bg-opacity-30`,
                      )}
                    >
                      <span
                        className={cn(
                          "m-1 inline-block font-bold",
                          `text-${column.color}`,
                        )}
                      >
                        {column.title.replace("_", " ") +
                          ` (${column.items.length})`}
                      </span>
                    </div>
                  </div>
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        className={cn(
                          "flex min-h-28 w-72 max-w-72 flex-col p-2 pt-2",
                          `bg-${column.color}/20`,
                        )}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {/* <Badge className=" px-1 py-3 rounded-sm self-start">
                    {column.title}
                  </Badge> */}
                        {column.items.map((item, index) => (
                          <TaskCard key={item.id} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DragDropContext>
    </>
  );
};

export default Kanban;

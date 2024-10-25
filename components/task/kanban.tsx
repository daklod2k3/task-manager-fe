"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tables } from "@/entity/database.types";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingDialog from "../loading/LoadingDialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import TaskCard from "./task-card";
import TaskDetail from "./task-detail";

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

const onDragEnd = (
  result: any,
  columns: any,
  setColumn: any,
  setLoading: any,
) => {
  // console.log(result, columns, setColumn);

  if (!result.destination) return;
  const { source, destination } = result;
  setLoading(true);
  let data;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumn({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumn({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

interface Props {
  taskList: Tables<"tasks">[];
}

interface ITableColumn {
  [key: string]: {
    items: Tables<"tasks">[];
    title: string;
  };
}

const dataToColumn = (taskList: Tables<"tasks">[]) => {
  let filter = taskList;
  const titles = [
    "To_do",
    "In_Progress",
    "In_Preview",
    "In_Complete",
    "QA",
    "Done",
    "Archived",
  ];
  const result: ITableColumn = {};
  for (const title of titles) {
    result[title] = {
      title: title,
      items: [],
    };
    filter = filter.filter((item) => {
      if (
        item.status.toLocaleLowerCase() ==
        title.toLocaleLowerCase().replaceAll(" ", "_")
      )
        result[title].items.push(item);
      else return item;
    });
  }

  console.log(result);

  return result;
};

const Kanban = ({ taskList }: Props) => {
  const [columns, setColumns] = useState(dataToColumn(taskList));
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // const [dialog, setDialog] = useState<{
  //   open: boolean;
  //   task: Tables<"tasks"> | undefined;
  // }>({
  //   open: false,
  //   task: undefined,
  // });
  const [dialog, setDialog] = useState<Tables<"tasks"> | boolean>(false);
  if (taskList.length == 0) return <span>No tasks found</span>;
  const openTaskDetail = (task: Tables<"tasks">) => {
    // setDialog({ task: task, open: true });
    const params = new URLSearchParams(searchParams);
    params.set("task_id", String(task.id));
    replace(`${pathname}?${params.toString()}`);
    setDialog(task);
  };

  // useEffect(()=>{

  // },[])

  return (
    <>
      <Dialog open={dialog !== false} onOpenChange={setDialog}>
        <DialogContent className="h-[calc(100vh-100px)] w-[calc(100vw-100px)] max-w-full">
          <TaskDetail task={dialog as Tables<"tasks">} />
        </DialogContent>
      </Dialog>
      <DragDropContext
        onDragEnd={(result) => {
          // setLoading(true);
          onDragEnd(result, columns, setColumns, setLoading);
          // setLoading(false);
        }}
      >
        <LoadingDialog open={loading} />
        <ScrollArea className="grid">
          <div className="grid h-max w-max grid-flow-col gap-5">
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  className="grid grid-rows-[auto,1fr] rounded-sm bg-primary/10"
                  key={columnId}
                >
                  <div className="sticky top-0 z-50 rounded-sm bg-primary px-3">
                    <span className="m-1 inline-block font-bold text-white">
                      {column.title.replace("_", " ")}
                    </span>
                  </div>
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        className="m-2 mt-2 flex min-h-28 min-w-72 flex-col"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {/* <Badge className=" px-1 py-3 rounded-sm self-start">
                    {column.title}
                  </Badge> */}
                        {column.items.map((item, index) => (
                          <TaskCard
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={() => openTaskDetail(item)}
                          />
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

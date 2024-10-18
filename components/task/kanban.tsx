"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { columnsFromBackend } from "./KanbanData";
import TaskCard from "./TaskCard";

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

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
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
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="grid grid-flow-col gap-5 overflow-scroll">
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="bg-primary/10 rounded-sm p-2 grid grid-rows-[auto,1fr]" key={columnId}>
              <div className="sticky top-0 bg-primary rounded-sm z-50">
                <span className="text-white inline-block m-1">
                  {column.title.replace("_", " ")}
                </span>
              </div>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    className="flex flex-col mt-2 min-h-28 min-w-72"
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
    </DragDropContext>
  );
};

export default Kanban;

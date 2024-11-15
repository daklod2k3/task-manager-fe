import { Tables } from "@/entity/database.types";
import { Draggable } from "@hello-pangea/dnd";

import React from "react";

import { useTaskContext } from "@/context/task-context";
import UserItem from "./user-item";
import { DueDateRender, PriorityIcon } from "./utils";

const TaskCard = ({
  item,
  index,
}: {
  item: Tables<"tasks">;
  index: number;
}) => {
  const {
    taskDetail: [, setDetail],
  } = useTaskContext();

  const onClick = () => {
    "click";
    setDetail(item);
  };

  return (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className="mb-2 flex min-w-0 flex-col rounded-sm bg-white p-3 text-sm hover:ring"
        >
          <div className="mb-3 text-base font-bold">
            <p className="break-all">{item.title}</p>
          </div>
          <div className="flex items-center justify-between font-bold">
            {/* Due date */}
            {item.due_date ? (
              DueDateRender({ date: new Date(item.due_date) })
            ) : (
              <span className="text-green-500">No due</span>
            )}
            {/* Left info */}
            <div className="flex items-center self-end">
              {PriorityIcon({ priority: item.priority })}
              <div>{}</div>
              <UserItem currentUsers={[]} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>

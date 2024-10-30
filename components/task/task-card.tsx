import { Tables } from "@/entity/database.types";
import { Draggable } from "@hello-pangea/dnd";

import React from "react";

import UserItem from "./user-item";
import { DueDateRender, PriorityIcon } from "./utils";

const TaskCard = ({
  item,
  index,
  onClick,
}: {
  item: Tables<"tasks">;
  index: number;
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className="mb-2 flex flex-col rounded-sm bg-white p-3 text-sm hover:ring"
        >
          <div className="mb-3">
            <div>{item.title}</div>
          </div>
          <div className="flex items-center justify-between font-bold">
            {/* Due date */}
            {DueDateRender({ date: new Date(item.due_date) })}
            {/* Left info */}
            <div className="flex items-center">
              {PriorityIcon({ priority: item.priority })}
              <div>{}</div>
              <UserItem user={null} size={6} />
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

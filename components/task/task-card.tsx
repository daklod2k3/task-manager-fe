import { Tables } from "@/entity/database.types";
import { Draggable } from "@hello-pangea/dnd";

import React from "react";

import { useTaskContext } from "@/context/task-context";
import { TaskEntity } from "@/entity/Task";
import { cn } from "@/lib/utils";
import {
  Building,
  CalendarClock,
  PencilLine,
  UserPen,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import UserItem from "./user-item";
import { DueDateRender, PriorityIcon } from "./utils";

export const PriorityColor = (priority: string) => {
  switch (priority.toLocaleLowerCase()) {
    case "high":
      return "red-500";
    case "medium":
      return "amber-500";
    case "low":
      return "green-500";
    default:
      return "gray-500";
  }
};

const TaskCard = ({ item, index }: { item: TaskEntity; index: number }) => {
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
          className="mb-2 flex min-w-0 flex-col gap-2 rounded-sm bg-white p-3 text-sm hover:ring"
        >
          {/* <div className="mb-3 text-base font-bold">
            <p className="break-all">{item.title}</p>
          </div>
          <div className="flex items-center justify-between font-bold">
            {item.due_date ? (
              DueDateRender({ date: new Date(item.due_date) })
            ) : (
              <span className="text-green-500">No due</span>
            )}
            <div className="flex items-center self-end">
              {PriorityIcon({ priority: item.priority })}
              <div>{}</div>
              <UserItem currentUsers={[]} />
            </div>
          </div> */}
          <Badge
            variant={"outline"}
            className={`w-fit rounded-none px-2 text-white border-${PriorityColor(item.priority)} bg-${PriorityColor(item.priority)}/20 rounded-full text-${PriorityColor(item.priority)} group`}
          >
            {item.priority}
          </Badge>

          <span className="text-current">{item.title}</span>

          {item.status.toLocaleLowerCase() != "done" && item.due_date && (
            <div className="flex items-center gap-2 text-gray-500">
              <CalendarClock size={17} />
              <DueDateRender date={new Date(item.due_date)} />
            </div>
          )}

          {item.assigned_to_user != 0 && (
            <div className="flex items-center gap-2 text-gray-500">
              <UserPen size={17} />
              <>
                <Badge className="rounded-full">Assigned</Badge> to{" "}
                {item.assigned_to_user} users
              </>
            </div>
          )}
          {item.assigned_to_department != 0 && (
            <div className="flex items-center gap-2 text-gray-500">
              <Building size={17} />
              <>
                <Badge className="rounded-full">Assigned</Badge> to{" "}
                {item.assigned_to_department} department
              </>
            </div>
          )}

          <div className="flex gap-2 text-gray-500">
            <PencilLine size={17} />
            <span className="font-semibold text-black">Created:</span>
            {item.created_by_navigation?.name}
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

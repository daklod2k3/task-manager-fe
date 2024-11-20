import { Tables } from "@/entity/database.types";
import { Draggable } from "@hello-pangea/dnd";

import React from "react";

import { useTaskContext } from "@/context/task-context";
import { TaskEntity } from "@/entity/Entity";
import { cn } from "@/lib/utils";
import {
  Building,
  CalendarClock,
  PencilLine,
  UserPen,
  Users,
} from "lucide-react";
import MyAvatar from "../Avatar";
import HoverInfo from "../HoverInfo";
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
  const { setDetail } = useTaskContext();

  const onClick = () => {
    "click";
    setDetail(item.id);
  };

  return (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className="mb-2 flex min-w-0 flex-col gap-2 rounded-sm bg-white p-3 text-sm text-[hsl(0,0%,3.9%)] hover:ring"
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

          <span className="font-semibold text-current">{item.title}</span>

          {item.status.toLocaleLowerCase() != "done" && item.due_date && (
            <div className="flex items-center gap-2 text-gray-500">
              <CalendarClock size={17} />
              <DueDateRender date={new Date(item.due_date)} />
            </div>
          )}

          {item.assigned_to_user != 0 && (
            <div className="flex items-center gap-2 text-gray-500">
              <UserPen size={17} />
              <div className="flex items-center -space-x-2">
                {/* <Badge className="rounded-full">Assigned</Badge> to{" "}
                {item.assigned_to_user} users */}
                {item.task_users?.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="box-border rounded-full ring-1 ring-white hover:z-10 hover:ring-1"
                  >
                    <HoverInfo label={item.user.name}>
                      <div>
                        <MyAvatar user={item.user} size={9} />
                      </div>
                    </HoverInfo>
                  </div>
                ))}
              </div>
              {item.assigned_to_user > 3 && (
                <span>+{item.assigned_to_user - 3}</span>
              )}
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
            <span className="font-semibold text-gray-500">Created:</span>
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

import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  Equal,
} from "lucide-react";
import React from "react";
import MyAvatar from "../Avatar";
import HoverInfo from "../HoverInfo";

// import CustomAvatar from '../TableComponents/CustomAvatar'
// import { ReactComponent as RedArrow } from '../../assets/icons/High.svg'
// import { ReactComponent as YellowArrow } from '../../assets/icons/Medium.svg'
// import { ReactComponent as BlueArrow } from '../../assets/icons/Low.svg'

// const TaskInformation = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   padding: 0 15px;
//   min-height: 106px;
//   border-radius: 5px;
//   max-width: 311px;
//   /* background: ${({ isDragging }) =>
//     isDragging ? "rgba(255, 59, 59, 0.15)" : "white"}; */
//   background: white;
//   margin-top: 15px;

//   .secondary-details {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     font-size: 12px;
//     font-weight: 400px;
//     color: #7d7d7d;
//   }
//   /* .priority{ */
//   /* margin-right: 12px; */
//   /* align-self: center;
//     svg{
//       width: 12px !important;
//       height: 12px !important;
//       margin-right: 12px; */
//   /* margin-top: 2px; */
//   /* } */
//   /* } */
// `;

const dueDateRender = (date: Date) => {
  const dayDiff = Math.floor(
    (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  // console.log(dayDiff);

  let color = "";
  if (dayDiff < 0) color = "red-500";
  else if (dayDiff > 2) color = "green-500";
  else color = "orange-500";
  return (
    <span className={cn("text-" + color)}>
      {dayDiff < 0 ? "Overdue" : dayDiff + " days left"}
    </span>
  );
};

const priorityIcon = (priority: string) => {
  const Icon = () => {
    switch (priority) {
      case "High":
        return <ChevronsUp className="text-red-500" />;
      case "Medium":
        return <Equal className="text-orange-500" />;
      case "Low":
        return <ChevronsDown className="text-green-500" />;
    }
  };

  return (
    <HoverInfo label={priority + " priority"}>
      <Icon />
    </HoverInfo>
  );
};

const TaskCard = ({ item, index }: any) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-sm flex flex-col bg-white mb-2 p-3 text-sm hover:bg-background/80"
        >
          <div className="mb-3">
            <div>{item.Task}</div>
          </div>
          <div className="flex font-bold justify-between">
            {/* Due date */}
            {dueDateRender(new Date(item.dueDate))}
            {/* Left info */}
            <div className="flex items-center">
              {priorityIcon(item.Priority)}
              <HoverInfo>
                <MyAvatar
                  imgSrc="/image/avatar/null-user.png"
                  // className="bg-"
                  size={7}
                  name="none"
                />
              </HoverInfo>
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

import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
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

const TaskCard = ({ item, index }: any) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-sm min-h-28 flex flex-col bg-white mb-3"
        >
          <div className="p-5 pb-0">
            <div>{item.Task}</div>
          </div>
          <div className="p-5">
            <div className="secondary-details">
              <p>
                <span>
                  {new Date(item.Due_Date).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </p>
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

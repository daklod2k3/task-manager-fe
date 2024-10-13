import { v4 as uuidv4 } from "uuid";
export const data = [
  {
    id: "1",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    // Assigned_To: 'Beltran',
    // Assignee: 'Romona',
    // Status: 'To-do',
    Priority: "Low",
    dueDate: "25-Nov-2025",
  },
  {
    id: "2",
    Task: "Fix Styling",
    // Assigned_To: 'Dave',
    // Assignee: 'Romona',
    // Status: 'To-do',
    Priority: "Low",
    dueDate: "10/13/2024",
  },
  {
    id: "3",
    Task: "Handle Door Specs",
    // Assigned_To: 'Roman',
    // Assignee: 'Romona',
    // Status: 'To-do',
    Priority: "Low",
    dueDate: "27-May-2020",
  },
  {
    id: "4",
    Task: "morbi",
    // Assigned_To: 'Gawen',
    // Assignee: 'Kai',
    // Status: 'Done',
    Priority: "High",
    dueDate: "23-Aug-2020",
  },
  {
    id: "5",
    Task: "proin",
    // Assigned_To: 'Bondon',
    // Assignee: 'Antoinette',
    // Status: 'In Progress',
    Priority: "Medium",
    dueDate: "05-Jan-2021",
  },
];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: "To-do",
    items: data,
  },
  [uuidv4()]: {
    title: "In Progress",
    items: [],
  },
  [uuidv4()]: {
    title: "Done",
    items: [],
  },
};

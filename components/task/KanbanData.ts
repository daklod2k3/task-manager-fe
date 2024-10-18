import { Tables } from "@/entity/database.types";
import { taskList } from "@/entity/testData";

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

interface ITableColumn {
  [key: string]: {
    items: Tables<"tasks">[]
    title: string
  }
}

export const columnsFromBackend =()=> {
  let filter = taskList
  const titles = ["To_do", "In_Progress", "In_Preview", "In_Complete", "QA", "Done", "Archived"]
  const result: ITableColumn = {}
  for (const title of titles){
    result[title] = {
      title: title,
      items: [] 
    }
    filter = filter.filter((item)=>{
      if (item.status == title)
        result[title].items.push(item)
      else 
      return item
    })
  }

  console.log(result);
  
  return result
};

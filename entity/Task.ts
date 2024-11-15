import { Tables } from "./database.types";

export interface TaskEntity extends Tables<"tasks"> {
  taskDepartments?: Tables<"task_department">[];
  taskUser?: Tables<"task_user">[];
  taskHistory?: Tables<"task_history">[];
}

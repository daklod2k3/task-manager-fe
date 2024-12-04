import { Tables } from "./database.types";

export interface TaskEntity extends Tables<"tasks"> {
  task_departments?: TaskDepartment[];
  task_users?: TaskUsers[];
  task_histories?: Tables<"task_history">[];
  created_by_navigation?: Tables<"profiles">;
}

export interface TaskUsers extends Tables<"task_user"> {
  user: Tables<"profiles">;
}

export interface TaskDepartment extends Tables<"task_department"> {
  department: Tables<"departments">;
}

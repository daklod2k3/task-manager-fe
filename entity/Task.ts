import { Tables } from "./database.types";

export interface TaskEntity extends Tables<"tasks"> {
  task_departments?: Tables<"task_department">[];
  task_users?: TaskUsers[];
  task_historys?: Tables<"task_history">[];
  created_by_navigation?: Tables<"profiles">;
}

export interface TaskUsers extends Tables<"task_user"> {
  user: Tables<"profiles">;
}

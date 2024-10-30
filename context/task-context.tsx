// import { getTask } from "@/action/Task";
// import { Tables } from "@/entity/database.types";
// import { Api } from "@/lib/utils";
// import React, { createContext, useContext } from "react";
// import useSWR, { SWRResponse } from "swr";

// export const TaskContext = createContext<SWRResponse>();

// const fetcher = async (path: string) => {
//   const result = await getTask();
//   if (result.error) throw new Error(result.error.message);
//   return result.data;
// };

// export function TaskProvider({ children }) {
//   const value = useSWR(Api.baseUrl + "/task", fetcher);

//   return (
//     <TaskContext.Provider value={{ ...value }}>{children}</TaskContext.Provider>
//   );
// }

// export function useTask() {
//   const context = useContext(TaskContext);
//   if (!context) throw new Error("You must wrap with Task Provider");
//   return context;
// }

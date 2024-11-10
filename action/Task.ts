"use server";
import { Tables } from "@/entity/database.types";
import { ApiAuth, ApiRoutes, IApiResponse } from "./Api";

export async function updateTask(task: Tables<"tasks">) {
  // console.log(form);

  // if (Math.random()) return taskList;
  // else return undefined;
  // console.log(task);

  try {
    const res = await new ApiAuth(ApiRoutes.Task).put(task);
    return await res.json();
  } catch (e) {
    console.log(e);
    // throw Error()
  }
}

export async function getTask(id?: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.Task).get(id);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
    // throw Error()
  }
}

// export async function getTask(id?: number) {
//   const supabase = createClient();
//   let filter = supabase.from("tasks").select();
//   if (id) filter = filter.eq("id", id);
//   console.log(filter.select);

//   return filter;
// }

export async function createTask(task: Tables<"tasks">) {
  try {
    const res = await new ApiAuth(ApiRoutes.Task).post(task);

    // return NextResponse.json(res, {});
    return (await res.json()) as IApiResponse<Tables<"tasks">>;
  } catch (e) {
    console.log(e);
    // throw Error()
  }
}

"use server";
import { Tables } from "@/entity/database.types";
import {
  ApiAuth,
  ApiRoutes,
  FilterOperators,
  GetProps,
  IApiResponse,
  RootFilter,
} from "./Api";

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

export async function getTask({ id, search }: GetProps) {
  // console.log(id);

  const includes = "TaskUsers.User,TaskDepartments,CreatedByNavigation";
  const params = new URLSearchParams(search);
  params.append("includes", includes);
  // if (id) {
  //   const res = await new ApiAuth(ApiRoutes.Task + /).get({
  //     search: params.toString(),
  //   });
  //   // console.log(res);

  //   return await res.json();
  // }
  try {
    const res = await new ApiAuth(ApiRoutes.Task).get({
      id,
      search: params.toString(),
    });
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

export async function updateStatus(
  id: Tables<"tasks">["id"],
  status: Tables<"tasks">["status"],
) {
  const res = await new ApiAuth(ApiRoutes.Task).patch(id, [
    {
      op: "replace",
      path: "status",
      value: status,
    },
  ]);

  return await res.json();
}

"use server";
import { Tables } from "@/entity/database.types";
import { Api, IApiResponse } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { stringFromBase64URL } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getAccessToken } from "./Auth";

export async function updateTask(task: Tables<"tasks">) {
  // console.log(form);

  // if (Math.random()) return taskList;
  // else return undefined;
  console.log(task);

  try {
    const res = await await fetch(Api.task, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      method: "PUT",
      body: JSON.stringify(task),
    });
    console.log(res);

    // return NextResponse.json(res, {});
    return res.json();
  } catch (e) {
    console.log(e);
    // throw Error()
  }
}

export async function getTask(id?: number) {
  const supabase = createClient();
  let filter = supabase.from("tasks").select();
  if (id) filter = filter.eq("id", id);
  return filter;
}

export async function createTask(task: Tables<"tasks">) {
  try {
    const res = await fetch(Api.task, {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(task),
    });

    // return NextResponse.json(res, {});
    return (await res.json()) as IApiResponse<Tables<"tasks">>;
  } catch (e) {
    console.log(e);
    // throw Error()
  }
}

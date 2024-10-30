"use server";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function updateTask(task: Tables<"tasks">) {
  // console.log(form);

  // if (Math.random()) return taskList;
  // else return undefined;

  try {
    const res = await (
      await fetch(Api.task, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(task),
      })
    ).json();

    if (!res.accessToken) return;
    console.log(res);

    cookies().set("access_token", res.accessToken);
    // return NextResponse.json(res, {});
    return res;
  } catch (e) {
    console.log(e);
    // throw Error()
  }
}

export async function getTask(id?: number) {
  const supabase = createClient();
  let filter = supabase.from("tasks").select();
  if (id) filter = await filter.eq("id", id);
  return filter;
}

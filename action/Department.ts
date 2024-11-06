"use server";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function addDepartment(department: Tables<"departments">) {
  try {
    const res = await (
      await fetch(Api.department, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(department),
      })
    ).json();

    if (!res.accessToken) return;
    console.log(res);

    cookies().set("access_token", res.accessToken);
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function updateDepartmentName(id: number, newName: string) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("departments")
      .update({ name: newName })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    console.log("Updated department:", data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getDepartment(id?: number) {
  const supabase = createClient();
  let filter = supabase.from("departments").select();
  if (id) filter = filter.eq("id", id);
  return filter;
}

export async function getMemberToDepartment(id?: number) {
  const supabase = createClient();
  let filter = supabase.from("department_user").select();
  if (id) filter = filter.eq("id", id);
  return filter;
}

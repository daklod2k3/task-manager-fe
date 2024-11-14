"use server";
import { Tables, TablesInsert } from "@/entity/database.types";
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

export async function addDepartmentSupabase(department: TablesInsert<"departments">) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("departments")
      .insert([department]);

    if (error) {
      console.error("Error adding department:", error.message);
      return null;
    }
    
    console.log("Department added:", data);
    return data;
  } catch (e) {
    console.error("Unexpected error:", e);
    return null;
  }
}

export async function deleteDepartmentSupabase(departmentId: number) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("departments")
      .delete()
      .eq("id", departmentId);

    if (error) {
      console.error("Error deleting department:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error in deleteDepartmentSupabase:", err);
    return null;
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

export async function getUser(id?: number) {
  const supabase = createClient();
  let filter = supabase.from("profiles").select();
  if (id) filter = filter.eq("id", id);
  return filter;
}

export async function getUserByDepartment(departmentId?: number) {
  const supabase = createClient();
  let filter = supabase.from("department_user").select();
  if (departmentId) filter = filter.eq("department_id", departmentId);
  return filter;
}

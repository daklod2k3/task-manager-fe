"use server";
import { Tables } from "@/entity/database.types";
import { ApiAuth, ApiRoutes, GetProps, IApiResponse } from "./Api";
import { createClient } from "@/utils/supabase/server";

export async function createDepartment(department: Tables<"departments">) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).post(department);

    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function deleteDepartment(departmentId: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).delete(departmentId);

    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function updateDepartment(id: number, data: object) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).patch(id, data);
    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function getDepartment(id?: number) {
  const supabase = createClient();
  let filter = supabase.from("departments").select();
  if (id) filter = filter.eq("id", id);
  return filter;
}

export async function getUserByDepartment(departmentId?: number) {
  const supabase = createClient();
  let filter = supabase.from("department_user").select();
  if (departmentId) filter = filter.eq("department_id", departmentId);
  return filter;
}

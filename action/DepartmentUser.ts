"use server";
import { Tables } from "@/entity/database.types";
import { ApiAuth, ApiRoutes, GetProps, IApiResponse } from "./Api";
import { createClient } from "@/utils/supabase/server";

export async function addDepartmentUser(departmentUser: Tables<"department_user">) {
  try {
    const res = await new ApiAuth(ApiRoutes.DepartmentUser).post(departmentUser);

    return (await res.json()) as IApiResponse<Tables<"department_user">>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function deleteDepartmentUser(departmentUserId: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.DepartmentUser).delete(departmentUserId);

    return (await res.json()) as IApiResponse<Tables<"department_user">>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function updateDepartmentUser(id: number, data: object) {
  try {
    const res = await new ApiAuth(ApiRoutes.DepartmentUser).patch(id, data);
    return (await res.json()) as IApiResponse<Tables<"department_user">>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function getDepartmentUser(id?: number) {
  const supabase = createClient();
  let filter = supabase.from("department_user").select();
  if (id) filter = filter.eq("id", id);
  return filter;
}
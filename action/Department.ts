"use server";
import { Tables } from "@/entity/database.types";
import { createClient } from "@/utils/supabase/server";
import { ApiAuth, ApiRoutes, GetProps, IApiResponse } from "./Api";

export async function createDepartment(department: Tables<"departments">) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).post(department);

    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error();
  }
}

export async function deleteDepartment(departmentId: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).delete(departmentId);

    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error();
  }
}

export async function updateDepartment(id: number, data: object) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).patch(id, data);
    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error();
  }
}

export async function getDepartment(props: GetProps) {
  return (await new ApiAuth(ApiRoutes.Department).get(props)).json();
}

export async function getUserByDepartment(departmentId?: number) {
  const supabase = createClient();
  let filter = supabase.from("department_user").select();
  if (departmentId) filter = filter.eq("department_id", departmentId);
  return filter;
}

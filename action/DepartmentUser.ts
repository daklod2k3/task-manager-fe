"use server";
import { Tables } from "@/entity/database.types";
import { ApiAuth, ApiRoutes, GetProps, IApiResponse } from "./Api";
import { createClient } from "@/utils/supabase/server";

export async function addDepartmentUser(departmentUser: Tables<"department_user">[]) {
  try {
    const results = await Promise.all(
      departmentUser.map(async (item) => {
        const response = await new ApiAuth(ApiRoutes.DepartmentUser).post(item);
        return await response.json();
      })
    );
    
    return results as IApiResponse<Tables<"department_user">>[];
  } catch (e) {
    console.log(e);
    throw new Error((e as Error).message);
  }
}

export async function deleteDepartmentUser(departmentUserId: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.DepartmentUser).delete(departmentUserId);

    return (await res.json()) as IApiResponse<Tables<"department_user">>;
  } catch (e) {
    console.log(e);
    throw new Error((e as Error).message);
  }
}

export async function updateDepartmentUser(departmentUser: Tables<"department_user">) {
  try {
    const res = await new ApiAuth(ApiRoutes.DepartmentUser).put(departmentUser);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

export async function updateOwner(id: number, value: string) {
  const data = [
    {
      op: "replace", 
      path: "/ownerType", 
      value: value,
    }
  ];
  try {
    const res = await new ApiAuth(ApiRoutes.DepartmentUser).patch(id, data);
    return (await res.json()) as IApiResponse<Tables<"department_user">>;
  } catch (e) {
    console.log(e);
    throw new Error((e as Error).message);
  }
}

export async function getDepartmentUser(id?: number) {
  const supabase = createClient();
  let filter = supabase.from("department_user").select();
  if (id) filter = filter.eq("id", id);
  return filter;
}
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

export async function updateDepartment(department: Tables<"departments">) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).put(department);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

export async function updateName(id: number, data: object) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).patch(id, data);
    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error();
  }
}

export async function getDepartment({ id, search }: GetProps) {
  const includes = "DepartmentUsers,TaskDepartments";
  const params = new URLSearchParams(search);
  params.append("includes", includes);
  try {
    const res = await new ApiAuth(ApiRoutes.Department).get({
      id,
      search: params.toString(),
    });
    console.log(res);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
}

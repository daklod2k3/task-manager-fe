"use server";
import { Tables } from "@/entity/database.types";
import { ApiAuth, ApiRoutes, GetProps, IApiResponse } from "./Api";

export async function createDepartment(department: Tables<"departments">) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).post(department);

    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function deleteDepartment(departmentId: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).delete(departmentId);

    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function updateDepartment(department: Tables<"departments">) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).put(department);
    return await res.json();
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function updateName(id: number, data: object) {
  try {
    const res = await new ApiAuth(ApiRoutes.Department).patch(id, data);
    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    throw new Error((e as Error).message);
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

// export async function getDepartmentComplete(id: number) {
//   try {
//     const params = new URLSearchParams();
//     params.append("id", id.toString());
//     params.append("includeCompletionPercentage", "true");

//     const res = await new ApiAuth(ApiRoutes.Department).get({
//       search: params.toString(),
//     });

//     const data = await res.json();

//     return {
//       success: true,
//       completionPercentage: data.data.completionPercentage,
//       department: data.data.department,
//     };
//   } catch (e) {
//     console.log("Server error:", e);
//     return {
//       error: "Server error",
//     };
//   }
// }
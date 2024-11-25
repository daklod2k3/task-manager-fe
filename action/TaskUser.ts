"use server";

import { ApiAuth, ApiRoutes, GetProps } from "./Api";

export const getTaskUser = async ({ id, search }: GetProps) => {
  const includes = "User";
  const params = new URLSearchParams(search);
  params.append("includes", includes);
  try {
    const res = await new ApiAuth(ApiRoutes.TaskUser).get({
      id,
      search: params.toString(),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
};

export const addTaskUser = async (data: any) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskUser).post(data);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
};

export const updateTaskUser = async (data: any) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskUser).put(data);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
};

export const deleteTaskUser = async (id: number) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskUser).delete(id);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
};

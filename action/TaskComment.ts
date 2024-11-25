"use server";

import { Tables } from "@/entity/database.types";
import { ApiAuth, ApiRoutes, GetProps } from "./Api";

export const getTaskComment = async ({ id, search }: GetProps) => {
  const includes = "User";
  const params = new URLSearchParams(search);
  params.append("includes", includes);
  try {
    const res = await new ApiAuth(ApiRoutes.TaskComment).get({
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

export const addTaskComment = async (data) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskComment).post(data);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
};

export const updateTaskComment = async (data: any) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskComment).put(data);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
};

export const deleteTaskComment = async (id: number) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskComment).delete(id);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
};

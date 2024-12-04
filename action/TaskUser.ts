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
    if (res instanceof Response) {
      return await res.json();
    } else {
      return res;
    }
  } catch (e) {
    console.log(e);
    return {
      error: String(e),
    };
  }
};

export const addTaskUser = async (data: any) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskUser).post(data);
    if (res instanceof Response) {
      return await res.json();
    } else {
      return res;
    }
  } catch (e) {
    console.log(e);
    return {
      error: String(e),
    };
  }
};

export const updateTaskUser = async (data: any) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskUser).put(data);
    if (res instanceof Response) {
      return await res.json();
    } else {
      return res;
    }
  } catch (e) {
    console.log(e);
    return {
      error: String(e),
    };
  }
};

export const deleteTaskUser = async (id: number) => {
  try {
    const res = await new ApiAuth(ApiRoutes.TaskUser).delete(id);
    if (res instanceof Response) {
      return await res.json();
    } else {
      return res;
    }
  } catch (e) {
    console.log(e);
    return {
      error: String(e),
    };
  }
};

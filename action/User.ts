"use server";

import { Tables } from "@/entity/database.types";
import { ApiAuth, ApiRoutes, IApiResponse } from "./Api";

export async function getProfile() {
  const api = new ApiAuth(ApiRoutes.Profile);
  const res = await api.get({
    search: "includes=Role",
  });
  // console.log(res);

  return await res.json();
}

export async function deleteUser(userId: string) {
  try {
    const res = await new ApiAuth(ApiRoutes.People).delete(userId);
    return (await res.json()) as IApiResponse<Tables<"profiles">>;
  } catch (e) {
    console.log(e);
    throw Error();
  }
}

export async function updateName(id: string, data: object) {

  try {
    const res = await new ApiAuth(ApiRoutes.Profile).patch(id, data);
    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error();
  }
}

"use server";

import { ApiAuth, ApiRoutes } from "./Api";

export async function getUser() {
  const api = new ApiAuth(ApiRoutes.User);
  const res = await api.get();
  // console.log(res);

  return await res.json();
}

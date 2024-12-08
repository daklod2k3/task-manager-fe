"use server";

import { ApiAuth, ApiRoutes } from "./Api";

export async function getProfile() {
  const api = new ApiAuth(ApiRoutes.Profile);
  const res = await api.get({
    search: "includes=Role",
  });
  // console.log(res);

  return await res.json();
}

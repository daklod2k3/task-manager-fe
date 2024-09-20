import { Api } from "@/lib/utils";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getUser(token: string) {
  try {
    const res = await (
      await fetch(Api.baseUrl + "/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    ).json();

    return res;
  } catch {
    return null;
  }
}

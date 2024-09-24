import { Api } from "@/lib/utils";
import { cookies } from "next/headers";

export async function getUser() {
  const token = cookies().get("accessToken")?.value;
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

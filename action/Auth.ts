"use server";
import { Api } from "@/lib/utils";
import { cookies } from "next/headers";

export async function login(form: any) {
  // console.log(form);

  try {
    const res = await (
      await fetch(Api.baseUrl + "/auth/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(form),
      })
    ).json();

    if (!res.accessToken) return;
    console.log(res);

    cookies().set("access_token", res.accessToken);
    // return NextResponse.json(res, {});
    return res;
  } catch (e) {
    console.log(e);
  }
}

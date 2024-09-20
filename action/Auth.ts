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
    cookies().set("accessToken", res.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    // return NextResponse.json(res, {});
    return res;
  } catch (e) {
    console.log(e);
  }
}

"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(form: any) {
  // console.log(form);

  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(form);

  if (error) {
    console.log(error.message);

    return { error: error.message };
  }
  revalidatePath("/", "layout");
  redirect("/");
}
export async function signup(form: any) {
  // console.log(form);

  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    ...form,
    options: {
      data: {
        name: form.name,
      },
    },
  });

  if (error) {
    console.log(error.message);

    return { error: error.message };
  }
  revalidatePath("/", "layout");
  redirect("/");
}

// export async function login(form: any) {
//   // console.log(form);

//   try {
//     const res = await (
//       await fetch(Api.baseUrl + "/auth/login", {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(form),
//       })
//     ).json();

//     console.log(res);
//     if (!res.access_token) return;

//     cookies().set("sb-ndoyladxdcpftovoalas-auth-token", res.access_token);
//     // return NextResponse.json(res, {});
//     return res;
//   } catch (e) {
//     console.log(e);
//   }
// }

export async function getAccessToken() {
  const supabase = createClient();
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  return token;
}

export async function logout() {
  const sp = createClient();
  const res = await sp.auth.signOut();
  if (res.error) {
    return { error: res.error.message };
  }
  redirect("/login");
}

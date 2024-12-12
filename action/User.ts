"use server";

import { Tables } from "@/entity/database.types";
import { createClient } from "@supabase/supabase-js";
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

export async function updateUser(id: string, formData: any) {
  const data = [
    {
      op: "replace",
      path: "/name",
      value: formData.name,
    },
    {
      op: "replace",
      path: "/bio",
      value: formData.bio,
    },
    {
      op: "replace",
      path: "/avt",
      value: formData.avt,
    },
    {
      op: "replace",
      path: "/RoleId",
      value: formData.role_id,
    },
  ];
  try {
    const res = await new ApiAuth(ApiRoutes.People).patch(id, data);
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

export async function CreateAcc(form: any) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
  );
  const { error } = await supabase.auth.admin.createUser({
    ...form,
    user_metadata: {
      name: form.name,
    },
  });

  if (error) {
    console.log(error.message);

    return { error: error.message };
  }

  // redirect("/permission?cate=User");
}

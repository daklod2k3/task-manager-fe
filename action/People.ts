"use server";

import { createClient } from "@/utils/supabase/server";

export async function getPeople() {
  const sp = createClient();
  const res = await sp.from("profiles").select();
  console.log(res);

  return res;
}

"use server";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export async function addTeam(team: Tables<"departments">) {
  try {
    const res = await (
      await fetch(Api.department, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(team),
      })
    ).json();

    if (!res) throw new Error("Không thể thêm team");
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteTeam(id: number) {
  try {
    const res = await (
      await fetch(`${Api.department}/${id}`, {
        headers: {
          Accept: "application/json",
        },
        method: "DELETE",
      })
    ).json();

    if (!res) throw new Error("Không thể xóa team");
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getTeamById(id: number) {
  const supabase = createClient();
  let filter = supabase.from("departments").select();
  if (id) filter = filter.eq("id", id);
  return filter;
}

export async function getAllTeams() {
  const supabase = createClient();
  return supabase.from("departments").select();
}

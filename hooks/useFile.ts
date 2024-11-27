"use client";
import { ApiAuth, ApiRoutes, Filter } from "@/action/Api";
import { getTask } from "@/action/Task";
import { Tables } from "@/entity/database.types";
import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";

const fetcher = async (path: string) => {
  const sp = createClient();

  const rs = await fetch("/api" + path, {
    headers: {
      Authorization:
        "Bearer " + (await sp.auth.getSession()).data.session?.access_token,
    },
  });
  if (!rs.ok) {
    throw Error((await rs.json()).error);
  }
  const blob = await rs.blob();
  return new File([blob], "preview", { type: blob.type });
};

export function useFile(id?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ApiRoutes.File + "/" + id : null,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

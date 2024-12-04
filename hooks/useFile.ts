"use client";
import { ApiRoutes } from "@/action/Api";
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
  if (rs.status === 403) throw new Error("Permission denied");

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

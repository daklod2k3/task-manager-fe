"use client";
import { ApiRoutes } from "@/action/Api";
import { Tables } from "@/entity/database.types";
import useSWR from "swr";

const fetcher = async (path: string) => {
  console.log(path);

  const id = path.replace("/task", "").split("/")[1];

  const search = new URLSearchParams(path.replace("/task", "").split("?")[1]);
  console.log(search);

  const result = await getTask({ id: Number(id), search: search.toString() });
  console.log(result);
  if (result.error) throw new Error(result.error);
  if (id) return result.data;
  return result.data;
};

export function useTaskUser(id?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Task + "/" + id,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

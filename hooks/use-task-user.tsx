"use client";
import { ApiRoutes } from "@/action/Api";
import { getTaskUser } from "@/action/TaskUser";
import { Tables } from "@/entity/database.types";
import useSWR from "swr";

const fetcher = async (path: string) => {
  console.log(path);

  const id = path.replace("/task", "").split("/")[1];

  const search = new URLSearchParams(path.replace("/task", "").split("?")[1]);
  console.log(search);

  const result = await getTaskUser({
    id: Number(id),
    search: search.toString(),
  });
  console.log(result);
  if (result.error) throw new Error(result.error);
  if (id) return result.data;
  return result.data;
};

export function useTaskUser(id?: number) {
  const path = id ? ApiRoutes.TaskUser + "/" + id : ApiRoutes.TaskUser;
  const { data, error, isLoading, mutate } = useSWR(path, fetcher, {
    revalidateOnMount: true,
  });
  return { data, error, isLoading, mutate };
}

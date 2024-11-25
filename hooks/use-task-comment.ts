"use client";
import { ApiRoutes, RootFilter } from "@/action/Api";
import { getTaskComment } from "@/action/TaskComment";
import useSWR from "swr";

const fetcher = async (path: string) => {
  console.log(path);

  const id = path.replace(ApiRoutes.TaskComment, "").split("/")[1];

  const search = new URLSearchParams(
    path.replace(ApiRoutes.TaskComment, "").split("?")[1],
  );
  // console.log(search);

  const result = await getTaskComment({
    id: Number(id),
    search: search.toString(),
  });
  console.log(result);
  if (result.error) throw new Error(result.error);
  if (id) return result.data;
  return result.data;
};

export function useTaskComment(id?: number, filter?: RootFilter) {
  let path = id ? ApiRoutes.TaskComment + "/" + id : ApiRoutes.TaskComment;
  const searchParam = new URLSearchParams();
  searchParam.append("filter", JSON.stringify(filter));

  if (filter) path += "?" + searchParam.toString();
  console.log(path);
  const { data, error, isLoading, mutate } = useSWR(path, fetcher, {
    revalidateOnMount: true,
  });
  return { data, error, isLoading, mutate };
}

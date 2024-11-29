"use client";
import { getDepartment } from "@/action/Department";
import { ApiRoutes } from "@/action/Api";
import useSWR from "swr";

const fetcher = async (path: string) => {
  console.log(path);

  const id = path.replace("/department", "").split("/")[1];

  const search = new URLSearchParams(path.replace("/department", "").split("?")[1]);
  console.log(search);

  const result = await getDepartment({ id: Number(id), search: search.toString() });
  console.log(result);
  if (result.error) throw new Error(result.error);
  if (id) return result.data;
  return result.data;
};

export function useAllDepartment() {
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Department,
    fetcher,
    {
      // revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

export function useDepartment(id?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Department + "/" + id,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}
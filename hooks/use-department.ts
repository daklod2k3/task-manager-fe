"use client";
import { getDepartment } from "@/action/Department";
import { ApiRoutes } from "@/action/Api";
import useSWR from "swr";

const fetcherById = async (id?: number) => {
  const result = await getDepartment(id);
  return result.data;
};

export function useDepartment(id?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    [ApiRoutes.Department, id],
    () => fetcherById(id),
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}
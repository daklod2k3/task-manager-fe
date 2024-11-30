"use client";
import { ApiRoutes, Filter, GetProps } from "@/action/Api";
import { getDepartment, getUserByDepartment } from "@/action/Department";
import { Tables } from "@/entity/database.types";
import useSWR from "swr";

const fetcher = async (key: { url: string; arguments: object }) => {
  const result = await getDepartment(key.arguments);
  return result.data;
};

export function useDepartment(props: GetProps) {
  const { data, error, isLoading, mutate } = useSWR(
    { url: ApiRoutes.Department, arguments: props },
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

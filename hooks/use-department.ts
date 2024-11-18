"use client";
import { getDepartment, getUserByDepartment } from "@/action/Department";
import { ApiRoutes, Filter } from "@/action/Api";
import { Tables } from "@/entity/database.types";
import useSWR from "swr";

interface Props {
  department?: Tables<"departments">;
}

const fetcher = async () => {
  const result = await getDepartment();
  return result.data;
};

export function useDepartment() {
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Department,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}
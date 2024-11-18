"use client";
import { getDepartmentUser } from "@/action/DepartmentUser";
import { ApiRoutes, Filter } from "@/action/Api";
import { Tables } from "@/entity/database.types";
import useSWR from "swr";

interface Props {
  department?: Tables<"departments">;
}

const fetcher = async () => {
  const result = await getDepartmentUser();
  return result.data;
};

export function useDepartmentUser() {
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.DepartmentUser,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}
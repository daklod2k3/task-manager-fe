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

const fetcherId = async () => {
  const search = new URLSearchParams(window.location.search);
  const result = await getUserByDepartment(Number(search.get("department_id")));

  return result.data;
} 

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

export function useDepartmentUser(id?: number) {
  const search = new URLSearchParams(window.location.search);
  
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Department + search.get("department_id"),
    fetcherId,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}
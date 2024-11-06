"use client";
import { getDepartment } from "@/action/Department";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import useSWR from "swr";
import React from "react";

interface Props {
  department?: Tables<"departments">;
}

const fetcher = async (path: string) => {
  const search = new URLSearchParams(path);
  const result = await getDepartment(Number(search.get("id")));
  
  if (result.error) throw new Error(result.error.message);
  return result.data;
};

export default function useDepartment(department?: Tables<"departments">) {
  const search = new URLSearchParams();
  if (department) search.append("id", String(department.id));

  const { data, error, isLoading, mutate } = useSWR(
    Api.baseUrl + "/department?" + search.toString(),
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

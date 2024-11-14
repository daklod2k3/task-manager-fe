"use client";
import { getUserByDepartment } from "@/action/Department";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import useSWR from "swr";
import React from "react";

interface Props {
  department?: Tables<"departments">;
}

const fetcher = async () => {
  const search = new URLSearchParams(window.location.search);
  const result = await getUserByDepartment(Number(search.get("department_id")));

  return result.data;
};

export default function useDepartmentUser(department?: Tables<"department_user">) {
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
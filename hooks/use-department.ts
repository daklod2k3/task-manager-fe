"use client";
import { getDepartment,  } from "@/action/Department";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import useSWR from "swr";

interface Props {
  department?: Tables<"departments">;
}

const fetcher = async () => {
  const result = await getDepartment();
  return result.data;
};

export default function useDepartment() {
  const { data, error, isLoading, mutate } = useSWR(
    Api.baseUrl + "/department",
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}
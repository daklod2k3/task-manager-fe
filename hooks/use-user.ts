"use client";
import { ApiRoutes } from "@/action/Api";
import { getUser } from "@/action/User";
import useSWR from "swr";

interface Props {
  // task?: Tables<"tasks">;
}

const fetcher = async (path: string) => {
  const result = await getUser();
  console.log(result)
  try {
    return result.data;
  } catch (e) {
    return result.error;
  }
};

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(ApiRoutes.User, fetcher);
  return { data, error, isLoading, mutate };
}

"use client";
import { ApiRoutes } from "@/action/Api";
import { getUser } from "@/action/User";
import useSWR from "swr";

interface Props {
  // task?: Tables<"tasks">;
}

const fetcher = async (path: string) => {
  const result = await getUser();
  return result;
};

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(ApiRoutes.User, fetcher);
  return { data, error, isLoading, mutate };
}

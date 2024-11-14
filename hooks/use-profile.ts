"use client";
import { getUser } from "@/action/Department";
import { Api } from "@/lib/utils";
import useSWR from "swr";

const fetcher = async () => {
  const result = await getUser();
  return result.data; 
};

export default function useProfile() {
  const { data, error, isLoading, mutate } = useSWR(
    Api.baseUrl + "/profile",
    fetcher, 
    {
      revalidateOnMount: true,
    }
  );
  return { data, error, isLoading, mutate };
}
import { ApiRoutes } from "@/action/Api";
import { Tables } from "@/entity/database.types";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher, useApiProps } from "./client-api";
import { useToast } from "./use-toast";

export default function useChannel<T = Tables<"channels">[]>({
  load = true,
  mode = "user",
  ...props
}: useApiProps) {
  const { toast } = useToast();

  const { data, error, isLoading, mutate } = useSWR(
    load
      ? {
          url:
            "/api" +
            (mode == "user" ? ApiRoutes.ChannelFromUser : ApiRoutes.Channel),
          arguments: props,
        }
      : null,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );

  useEffect(() => {
    if (error)
      toast({
        title: "Fetch data error",
        description: String(error),
        variant: "destructive",
      });
  }, [error]);

  return { data: data as T, error, isLoading, mutate };
}

import { ApiRoutes } from "@/action/Api";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher, useApiProps } from "./client-api";
import { useToast } from "./use-toast";

export default function useChannel({
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

  return { data: data, error, isLoading, mutate };
}

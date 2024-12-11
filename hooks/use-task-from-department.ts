import { ApiRoutes, Filter, RootFilter } from "@/action/Api";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher, useApiProps } from "./client-api";
import { useToast } from "./use-toast";

export default function useTaskFromDepartment({
  load = true,
  ...props
}: useApiProps & { department_id?: number }) {
  const { toast } = useToast();
  const search = new URLSearchParams(props.search);
  search.append("department_id", String(props.department_id));

  const { data, error, isLoading, mutate } = useSWR(
    load
      ? {
          url: "/api" + ApiRoutes.Department + "/task",
          arguments: {
            ...props,
            id: props.department_id,
          },
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
  console.log(data);

  return { data: data && data.task_departments, error, isLoading, mutate };
}

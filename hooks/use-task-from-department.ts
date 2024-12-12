import { ApiRoutes, Filter, RootFilter } from "@/action/Api";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, useApiProps } from "./client-api";
import { useToast } from "./use-toast";

export default function useTaskFromDepartment({
  load = true,
  department_id,
  ...props
}: useApiProps & { department_id?: number }) {
  const { toast } = useToast();
  const [search, setSearch] = useState(new URLSearchParams());

  const { data, error, isLoading, mutate } = useSWR(
    load && department_id
      ? {
          url: "/api" + ApiRoutes.Department + "/task",
          arguments: {
            ...props,
            search,
          },
        }
      : null,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );

  useEffect(() => {
    const search = new URLSearchParams(props.search);
    search.append("department_id", String(department_id));
    setSearch(search);
  }, [department_id, props.search]);

  // useEffect({{}})

  useEffect(() => {
    if (error)
      toast({
        title: "Fetch data error",
        description: String(error),
        variant: "destructive",
      });
  }, [error]);
  console.log(data);

  return { data: data, error, isLoading, mutate };
}

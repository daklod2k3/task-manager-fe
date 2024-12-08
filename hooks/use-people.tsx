// import { ApiRoutes } from "@/action/Api";
// import { getPeople } from "@/action/People";
// import { ISearchItem } from "@/components/search-select";
// import { Tables } from "@/entity/database.types";
// import useSWR from "swr";

// const fetcher = async () => {
//   return (await getPeople()).data || [];
// };

// export function usePeople() {
//   const { data, error, mutate, isLoading } = useSWR(ApiRoutes.People, fetcher);

//   return {
//     data,
//     error,
//     mutate,
//     isLoading,
//   };
// }

import { ApiRoutes } from "@/action/Api";
import { Tables } from "@/entity/database.types";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher, useApiProps } from "./client-api";
import { useToast } from "./use-toast";

export function usePeople({ load = true, ...props }: useApiProps) {
  const { toast } = useToast();

  const { data, error, isLoading, mutate } = useSWR(
    load
      ? {
          url: "/api" + ApiRoutes.People,
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

export function peopleToSearch(
  peoples: Tables<"profiles">[],
): ISearchItem<Tables<"profiles">>[] {
  return peoples.map((p) => {
    return {
      value: p,
      label: p.name,
      search: [p.name].join(" "),
    };
  });
}

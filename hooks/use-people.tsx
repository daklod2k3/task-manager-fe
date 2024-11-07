import { getPeople } from "@/action/People";
import { ISearchItem } from "@/components/search-select";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import useSWR from "swr";

const fetcher = async () => {
  return await getPeople()
    .then((res) => res.data)
    .catch((err) => err);
};

export function usePeople() {
  const { data, error, mutate, isLoading } = useSWR(Api.people, fetcher);

  return {
    data,
    error,
    mutate,
    isLoading,
  };
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

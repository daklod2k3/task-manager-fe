"use client";
import { ApiRoutes, Filter } from "@/action/Api";
import { getTask } from "@/action/Task";
import { Tables } from "@/entity/database.types";
import useSWR from "swr";

interface Props {
  task?: Tables<"tasks">;
}
const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const fetcher = async (path: string) => {
  console.log(path);

  const id = path.replace("/task", "").split("/")[1];

  const search = new URLSearchParams(path.replace("/task", "").split("?")[1]);
  console.log(search);

  const result = await getTask({ id: Number(id), search: search.toString() });
  // console.log(result);
  if (result.error) throw new Error(result.error);
  if (id) return result.data;
  return result.data;
};

export interface TaskFilter {
  peopleFilter?: Filter<Tables<"profiles">>;
  filter?: Filter<Tables<"tasks">>;
}

export interface TaskFetchProps {
  filter?: TaskFilter;
}

export function useAllTask(taskFilter?: TaskFilter) {
  const search = new URLSearchParams();
  const filter = Object.entries(taskFilter || {}).reduce<any[]>(
    (acc, [key, value]) => {
      if (value) acc.push(value);
      return acc;
    },
    [],
  );
  if (filter)
    search.append(
      "filter",
      JSON.stringify({
        filters: filter,
        logic: "and",
      }),
    );
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Task + "?" + search,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

export function useTask(id?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Task + "/" + id,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

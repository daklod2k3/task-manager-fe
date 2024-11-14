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
<<<<<<< HEAD
  const search = new URLSearchParams(path);
  const result = await getTask(Number(search.get("id")));
  // console.log(path);
  if (result.error) throw new Error(result.error.message);
=======
  const id = path.split("/").pop();
  console.log(id);

  const search = new URLSearchParams(path);
  const result = await getTask({ id: Number(id), search: search.toString() });
  console.log(result);
  if (result.error) throw new Error(result.error);
>>>>>>> d06eff5dd4ab48cefb7b7b25f1b7f1c9c5fcd382
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

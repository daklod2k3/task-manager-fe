"use client";
import { addTeam } from "@/action/Team";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import useSWR from "swr";

interface Props {
  task?: Tables<"tasks">;
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const fetcher = async (path: string) => {
  // const search = new URLSearchParams(path);
  // const result = await getTask(Number(search.get("id")));
  // // console.log(path);

  // if (result.error) throw new Error(result.error.message);
  // return result.data;
};

export default function useTask(task?: Tables<"tasks">) {
  // console.log("load");
  const search = new URLSearchParams();
  if (task) search.append("id", String(task.id));

  const { data, error, isLoading, mutate } = useSWR(
    Api.baseUrl + "/department?" + search.toString(),
    fetcher,
  );
  return { data, error, isLoading, mutate };
}

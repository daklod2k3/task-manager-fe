"use client";
import { getTask } from "@/action/Task";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface Props {
  task?: Tables<"tasks">;
}
const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const fetcher = async (path: string) => {
  const id = path.split("/").pop();
  const result = await getTask(Number(id));
  console.log(result);
  if (result.error) throw new Error(result.error);
  return result.data;
};

export function useAllTask() {
  const { data, error, isLoading, mutate } = useSWR(
    Api.baseUrl + "/task",
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

export function useTask(id?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    Api.baseUrl + "/task/" + id,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

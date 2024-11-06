"use client";
import { getTask } from "@/action/Task";
import { Tables } from "@/entity/database.types";
import { Api } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface Props {
  // task?: Tables<"tasks">;
}

const fetcher = async (path: string) => {
  const result = await getTask();
  if (result.error) throw new Error(result.error.message);
  return result.data;
};

export default function useUser() {
  const { data, error, isLoading, mutate } = useSWR(
    Api.baseUrl + "/user",
    fetcher,
  );
  return { data, error, isLoading, mutate };
}

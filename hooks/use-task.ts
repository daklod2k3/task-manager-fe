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

export default function useTask(task?: Tables<"tasks">) {
  // const { data, error, isLoading } = useSWR(Api.baseUrl + "/task", fetcher);
  const [taskList, setData] = useState<any>();
  // const [error, setError] =
  useEffect(() => {
    // const supabase = createClient();
    // supabase
    //   .from("tasks")
    //   .select()
    //   .then((value) => {
    //     console.log(value);
    //     if (value.data) setData(value.data);
    //     return value;
    //   });
    getTask(task?.id).then((value) => {
      console.log(value);
      if (value.data) setData(value.data);
      // return value;
      //   });
    });
  }, []);
  return { data: taskList, error: undefined, isLoading: true };
}

import { ApiRoutes } from "@/action/Api";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export enum EChannelOption {
  List,
}

interface Props {
  option: EChannelOption;
}

export default function useChannel({ option }: Props) {
  const { data, error, isLoading } = useSWR(ApiRoutes.Channel, fetcher);
}

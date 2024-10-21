import { Api } from "@/lib/utils";
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
  const { data, error, isLoading } = useSWR(Api.baseUrl + "/channel", fetcher);
}

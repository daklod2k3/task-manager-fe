"use client";
import { GetProps } from "@/action/Api";

export interface useApiProps extends GetProps {
  load?: boolean;
}

export interface fetcherProps {
  url: string;
  arguments?: GetProps;
}

export async function fetcher(fetcherProps: fetcherProps) {
  // console.log(fetcherProps);
  // if (!fetcherProps) return;
  let path = fetcherProps.url;
  if (fetcherProps.arguments?.id) path += `/${fetcherProps.arguments.id}`;
  const params = new URLSearchParams(fetcherProps.arguments?.search);
  if (fetcherProps.arguments?.includes)
    params.append("includes", fetcherProps.arguments?.includes);
  if (fetcherProps.arguments?.id) console.log(params);

  if (params.size > 0) path += `?${params.toString()}`;
  console.log(path);

  const res = await fetch(path);
  // console.log(res);
  if (res.status === 403 || res.status === 401)
    throw new Error("Permission denied");
  return res.json().then((data) => data.data);
}

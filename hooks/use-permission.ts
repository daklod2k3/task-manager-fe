import { ApiRoutes } from "@/action/Api";
import { getRole,getResoucre } from "@/action/Permission";
import useSWR from "swr";

const fetcher = async (path: string) => {
  const id = path.replace("/role", "").split("/")[1];

  const search = new URLSearchParams(path.replace("/role", "").split("?")[1]);

  const result = await getRole({ id: Number(id), search: search.toString() });
  if (result.error) throw new Error(result.error);
  if (id) return result.data;
  return result.data;
};

export function useRole(id?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Role + "/" + id,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

const fetcherResource = async (path: string) => {
  const id = path.replace("/resource", "").split("/")[1];

  const search = new URLSearchParams(path.replace("/resource", "").split("?")[1]);

  const result = await getResoucre({ id: Number(id), search: search.toString()});
  if (result.error) throw new Error(result.error);
  if (id) return result.data;
  return result.data;
};

export function useResource(id?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    ApiRoutes.Resource + "/" + id,
    fetcherResource,
    {
      revalidateOnMount: true,
    },
  );
  return { data, error, isLoading, mutate };
}

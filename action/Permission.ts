"use server";
import { Tables } from "@/entity/database.types";
import { ApiAuth, ApiRoutes, GetProps, IApiResponse } from "./Api";

export async function getResoucre({ id, search }: GetProps) {
  const includes = "Permissions";
  const params = new URLSearchParams(search);
  params.append("includes", includes);
  try {
    const res = await new ApiAuth(ApiRoutes.Resource).get({
      id,
      search: params.toString(),
    });
    console.log(res);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
}

export async function getRole({ id, search }: GetProps) {
  const includes = "Permissions";
  const params = new URLSearchParams(search);
  params.append("includes", includes);
  try {
    const res = await new ApiAuth(ApiRoutes.Role).get({
      id,
      search: params.toString(),
    });
    console.log(res);
    return await res.json();
  } catch (e) {
    console.log(e);
    return {
      error: "Server error",
    };
  }
}

export async function addRole(role: any) {
  try {
    const res = await new ApiAuth(ApiRoutes.Role).post(role);

    return (await res.json()) as IApiResponse<any>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function addResource(resource: any) {
  try {
    const res = await new ApiAuth(ApiRoutes.Resource).post(resource);

    return (await res.json()) as IApiResponse<any>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function addPermission(permission: any) {
  try {
    const res = await new ApiAuth(ApiRoutes.Permission).post(permission);
    return (await res.json()) as IApiResponse<any>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function updateResource(resource: any) {
  try {
    const res = await new ApiAuth(ApiRoutes.Resource).put(resource);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

export async function updatePermission(id: number, formData: any){
  const data = [
    {
        "op": "replace",
        "path": "/view",
        "value": formData.view
    },
    {
        "op": "replace",
        "path": "/delete",
        "value": formData.delete
    },
    {
        "op": "replace",
        "path": "/update",
        "value": formData.update
    },
    {
        "op": "replace",
        "path": "/create",
        "value": formData.create
    }
  ];
  try {
    const res = await new ApiAuth(ApiRoutes.Permission).patch(id, data);
    return (await res.json()) as IApiResponse<Tables<"departments">>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function deleteRole(role: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.Role).delete(role);

    return (await res.json()) as IApiResponse<any>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function deletePermission(permission: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.Permission).delete(permission);

    return (await res.json()) as IApiResponse<any>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}

export async function deleteResource(resource: number) {
  try {
    const res = await new ApiAuth(ApiRoutes.Resource).delete(resource);

    return (await res.json()) as IApiResponse<any>;
  } catch (e) {
    console.log(e);
    throw Error()
  }
}
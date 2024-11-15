import { getAccessToken } from "./Auth";

export interface IApiResponse<T> {
  status: number;
  data: T;
  error: string;
}

const baseUrl = String(process.env.API_URL);
export const enum ApiRoutes {
  User = "/user",
  Task = "/task",
  People = "/people",
  Channel = "/channel",
  Department = "/department",
}

export interface GetProps {
  id?: number;
  search?: string;
}
export class ApiAuth {
  protected token;
  protected route;

  constructor(route: ApiRoutes) {
    this.token = getAccessToken();
    this.route = baseUrl + route;
  }

  async get({ id, search }: GetProps) {
    const path = id ? `${this.route}/${id}` : this.route;
    return fetch(path + "?" + search, {
      headers: {
        Authorization: `Bearer ${await this.token}`,
      },
    });
  }

  async post(data: any) {
    return fetch(this.route, {
      headers: {
        Authorization: `Bearer ${await this.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(data: any) {
    return fetch(this.route, {
      headers: {
        Authorization: `Bearer ${await this.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch(id, data: any) {
    return fetch(this.route + `/${id}`, {
      headers: {
        Authorization: `Bearer ${await this.token}`,
        Accept: "application/json",
        "Content-Type": "application/json-patch+json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // async delete(id: number) {
  //   return fetch(`${this.route}/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${await this.token}`,
  //     },
  //     method: "DELETE",
  //   });
  // }
}

export enum FilterOperators {
  eq,
  neq,
  lt,
  lte,
  gt,
  gte,
  ctn,
}

export enum FilterLogic {
  And,
  Or,
}
export class Filter<T = object> {
  public field: keyof T;
  public operator: FilterOperators;
  public value: T[keyof T];
  public logic?: FilterLogic = FilterLogic.And;
  public filters?: Filter[];

  constructor({ Field, Operator, Value, Logic, Filters }) {
    this.field = Field;
    this.operator = Operator;
    this.value = Value;
    this.logic = Logic;
    this.filters = Filters;
  }
}

export class RootFilter {
  filters: Filter[];
  logic: FilterLogic = FilterLogic.And;
  constructor({ Filters, Logic }) {
    this.filters = Filters;
    this.logic = Logic;
  }
}

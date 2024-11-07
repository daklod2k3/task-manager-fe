import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const baseUrl = String(process.env.API_URL);

export const Api = {
  baseUrl: baseUrl,
  task: baseUrl + "/task",
  people: baseUrl + "/user",
};

export interface IApiResponse<T> {
  status: number;
  data: T[];
  error: string;
}

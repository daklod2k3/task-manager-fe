import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const baseUrl = String(process.env.API_URL);

export const Api = {
  baseUrl: baseUrl,
  task: baseUrl + "/task",
  department: baseUrl + "/department"
};

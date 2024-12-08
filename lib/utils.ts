import { createClient } from "@/utils/supabase/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatTimeLanguage = {
  vn: {
    now: "Vừa xong",
    second: "giây",
    minute: "phút",
    hour: "giờ",
    day: "ngày",
  },
  en: {
    now: "Just now",
    second: "second",
    minute: "minute",
    hour: "hour",
    day: "day",
  },
};

export const FormatTime = (
  time: string,
  sort: boolean = true,
  language: keyof typeof formatTimeLanguage = "en",
) => {
  // if (typeof window == "undefined") return;
  if (!time) return null;
  const postTime = new Date(time);
  const current = new Date();
  const diff = current.getTime() - postTime.getTime() * (sort ? 1 : -1);
  // cons

  // console.log(diff / 1000 / 60);
  const second = diff / 1000;
  if (second < 60)
    if (second < 1) return formatTimeLanguage[language].now;
    else return Math.floor(second) + " " + formatTimeLanguage[language].second;
  const minutes = second / 60;
  if (minutes < 60)
    return Math.floor(minutes) + " " + formatTimeLanguage[language].minute;
  const hours = minutes / 60;
  if (hours < 24)
    return Math.floor(hours) + " " + formatTimeLanguage[language].hour;

  const day = hours / 24;
  // if ()
  if (day < 30) return Math.floor(day) + " " + formatTimeLanguage[language].day;

  if (current.getFullYear() !== postTime.getFullYear())
    return postTime.getTime();

  // if (current.getMonth() !== postTime.getMonth())
  return postTime.toDateString();
  // console.log(postTime.toLocaleString("vi"));
};

export async function getUserId() {
  const sp = createClient();
  return (await sp.auth.getUser()).data.user?.id;
}

"use client";
import { Tables } from "@/entity/database.types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface DetailProps<T> {
  (): [T, Dispatch<SetStateAction<T>>];
}

const DetailContext = createContext<DetailProps<Tables<"tasks">> | undefined>(
  undefined,
);

export function TaskDetailProvider({ children }) {
  const value = useState<Tables<"tasks">>();

  return (
    <DetailContext.Provider value={[...value]}>
      {children}
    </DetailContext.Provider>
  );
}

export default function UseTaskDetail() {
  return useContext(DetailContext);
}

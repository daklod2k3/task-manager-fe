import { TaskProvider } from "@/context/task-context";
import React from "react";
import Client from "./client";

export default function Page() {
  return (
    <TaskProvider>
      <Client />
    </TaskProvider>
  );
}

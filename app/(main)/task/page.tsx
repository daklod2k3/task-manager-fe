import BuildBreadcrumb from "@/components/build-breadcrumb";
import PageHeader from "@/components/page-header";
import { TaskProvider } from "@/context/task-context";
import { CalendarDays } from "lucide-react";
import React from "react";
import Client from "./client";

export default function Page() {
  return (
    <TaskProvider type="user">
      <Client />
    </TaskProvider>
  );
}

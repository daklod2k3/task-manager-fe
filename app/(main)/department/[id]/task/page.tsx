import { TaskProvider } from "@/context/task-context";
import ClientTask from "./client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const department_id = (await params).id;
  return (
    <>
      <TaskProvider type="department">
        <ClientTask department_id={department_id} />
      </TaskProvider>
    </>
  );
}

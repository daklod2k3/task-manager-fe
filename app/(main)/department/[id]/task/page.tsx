import ClientTask from "@/app/(main)/task/client";
import { TaskProvider } from "@/context/task-context";

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

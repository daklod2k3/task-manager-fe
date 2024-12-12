import ClientTask from "@/app/(main)/task/client";
import { TaskProvider } from "@/context/task-context";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const department_id = (await params).id;
  console.log(department_id);

  return (
    <TaskProvider type="department" department_id={Number(department_id)}>
      <ClientTask department_id={department_id} />
    </TaskProvider>
  );
}

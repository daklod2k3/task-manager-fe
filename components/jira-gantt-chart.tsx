import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";

const tasks = [
  {
    id: "TASK-1",
    name: "Design mockups",
    assignee: { name: "Alice", avatar: "/avatars/01.png" },
    status: "done",
    start: 1,
    duration: 2,
  },
  {
    id: "TASK-2",
    name: "Implement frontend",
    assignee: { name: "Bob", avatar: "/avatars/02.png" },
    status: "in-progress",
    start: 2,
    duration: 3,
  },
  {
    id: "TASK-3",
    name: "Backend development",
    assignee: { name: "Charlie", avatar: "/avatars/03.png" },
    status: "in-progress",
    start: 3,
    duration: 4,
  },
  {
    id: "TASK-4",
    name: "Testing",
    assignee: { name: "David", avatar: "/avatars/04.png" },
    status: "todo",
    start: 6,
    duration: 2,
  },
  {
    id: "TASK-5",
    name: "Deployment",
    assignee: { name: "Eve", avatar: "/avatars/05.png" },
    status: "todo",
    start: 7,
    duration: 1,
  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const statusIcons = {
  done: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  "in-progress": <Circle className="h-5 w-5 text-blue-500" />,
  todo: <AlertCircle className="h-5 w-5 text-gray-500" />,
};

export function JiraGanttChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase text-gray-500">
                <th className="px-4 py-2 text-left font-medium">Task</th>
                <th className="px-4 py-2 text-left font-medium">Assignee</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                {days.map((day) => (
                  <th key={day} className="px-4 py-2 text-center font-medium">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">
                    <div className="font-medium">{task.id}</div>
                    <div className="text-sm text-gray-500">{task.name}</div>
                  </td>
                  <td className="px-4 py-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                      />
                      <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="px-4 py-2">{statusIcons[task.status]}</td>
                  {days.map((_, index) => (
                    <td key={index} className="px-4 py-2">
                      {index + 1 >= task.start &&
                      index + 1 < task.start + task.duration ? (
                        <div
                          className={`h-6 w-full rounded-sm ${
                            task.status === "done"
                              ? "bg-green-200"
                              : task.status === "in-progress"
                                ? "bg-blue-200"
                                : "bg-gray-200"
                          }`}
                        ></div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

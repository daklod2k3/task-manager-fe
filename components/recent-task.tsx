import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

const tasks = [
  { id: 1, title: "Create wireframe", completed: true },
  { id: 2, title: "Design mockup", completed: false },
  { id: 3, title: "Implement dashboard", completed: false },
  { id: 4, title: "Write documentation", completed: false },
];

export function RecentTasks() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center">
              {task.completed ? (
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <Circle className="mr-2 h-4 w-4 text-gray-300" />
              )}
              <span
                className={task.completed ? "text-gray-500 line-through" : ""}
              >
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

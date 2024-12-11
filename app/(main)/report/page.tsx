import BuildBreadcrumb from "@/components/build-breadcrumb";
import { RecentActivity } from "@/components/recent-activity";
import { TaskCompletionRate } from "@/components/task-completion-rate";
import { TaskPriorityChart } from "@/components/task-priority-chart";
import { TaskStatusChart } from "@/components/task-status-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportPage() {
  return (
    <div className="container mx-auto p-4">
      <BuildBreadcrumb />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskStatusChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskPriorityChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskCompletionRate />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

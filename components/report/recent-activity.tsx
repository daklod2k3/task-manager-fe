import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  { id: 1, action: "Created task", task: "Implement user authentication", timestamp: "2 hours ago" },
  { id: 2, action: "Completed task", task: "Design landing page", timestamp: "5 hours ago" },
  { id: 3, action: "Updated task", task: "Refactor database schema", timestamp: "1 day ago" },
  { id: 4, action: "Deleted task", task: "Old feature request", timestamp: "2 days ago" },
  { id: 5, action: "Created task", task: "Optimize image loading", timestamp: "3 days ago" },
]

export function RecentActivity() {
  return (
    <ScrollArea className="h-[250px]">
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex justify-between items-start">
            <div>
              <p className="font-medium">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.task}</p>
            </div>
            <span className="text-xs text-gray-400">{activity.timestamp}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}


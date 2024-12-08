import { GanttChart } from "@/components/grantt-chart";
import { JiraGanttChart } from "@/components/jira-gantt-chart";
import { StatsCard } from "@/components/stat-card";
import { TaskStatusChart } from "@/components/task-status-chart";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex min-h-0 flex-col gap-8 overflow-y-auto overflow-x-hidden sm:items-start">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-3xl font-medium text-secondary-foreground">
            Dashboard
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Completed Tasks"
              value="8"
              icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="In Progress"
              value="4"
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            />
            <TaskStatusChart />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3"></div>
          <GanttChart />
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

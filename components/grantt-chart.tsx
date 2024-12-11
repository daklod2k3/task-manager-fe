"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  addMonths,
  format,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
} from "date-fns";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
}

const tasks: Task[] = [
  {
    id: "1",
    name: "Project Initiation",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 31),
    color: "bg-red-500",
  },
  {
    id: "2",
    name: "Requirements Gathering",
    startDate: new Date(2024, 1, 1),
    endDate: new Date(2024, 2, 31),
    color: "bg-blue-500",
  },
  {
    id: "3",
    name: "System Architecture",
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 4, 31),
    color: "bg-green-500",
  },
  {
    id: "4",
    name: "UI/UX Design",
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 4, 31),
    color: "bg-yellow-500",
  },
  {
    id: "5",
    name: "Backend Development",
    startDate: new Date(2024, 5, 1),
    endDate: new Date(2024, 7, 31),
    color: "bg-purple-500",
  },
  {
    id: "6",
    name: "Frontend Development",
    startDate: new Date(2024, 5, 1),
    endDate: new Date(2024, 7, 31),
    color: "bg-pink-500",
  },
  {
    id: "7",
    name: "Integration Testing",
    startDate: new Date(2024, 8, 1),
    endDate: new Date(2024, 8, 30),
    color: "bg-indigo-500",
  },
  {
    id: "8",
    name: "User Acceptance Testing",
    startDate: new Date(2024, 9, 1),
    endDate: new Date(2024, 9, 31),
    color: "bg-teal-500",
  },
  {
    id: "9",
    name: "Training",
    startDate: new Date(2024, 10, 1),
    endDate: new Date(2024, 10, 30),
    color: "bg-orange-500",
  },
  {
    id: "10",
    name: "Go Live",
    startDate: new Date(2024, 11, 1),
    endDate: new Date(2024, 11, 31),
    color: "bg-cyan-500",
  },
];

export function GanttChart() {
  const [startDate, setStartDate] = useState(new Date(2024, 0, 1));
  const months = Array.from({ length: 12 }, (_, i) => addMonths(startDate, i));

  const handlePrevYear = () => setStartDate(addMonths(startDate, -12));
  const handleNextYear = () => setStartDate(addMonths(startDate, 12));

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Project Timeline</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevYear}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">{format(startDate, "yyyy")}</span>
          <Button variant="outline" size="icon" onClick={handleNextYear}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="inline-flex flex-col space-y-4">
            <div className="flex">
              <div className="w-40 flex-shrink-0" />
              {months.map((month) => (
                <div
                  key={month.toISOString()}
                  className="w-20 flex-shrink-0 text-center text-sm"
                >
                  {format(month, "MMM")}
                </div>
              ))}
            </div>
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center">
                <div className="w-40 flex-shrink-0 truncate pr-4 text-sm">
                  {task.name}
                </div>
                <div className="flex flex-1">
                  {months.map((month) => {
                    const isActive = isWithinInterval(startOfMonth(month), {
                      start: task.startDate,
                      end: task.endDate,
                    });
                    const isStart = isSameMonth(month, task.startDate);
                    const isEnd = isSameMonth(month, task.endDate);
                    return (
                      <TooltipProvider key={month.toISOString()}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              className={`h-6 w-20 flex-shrink-0 border-r ${
                                isActive ? task.color : "bg-gray-100"
                              } ${isStart ? "rounded-l-full" : ""} ${isEnd ? "rounded-r-full" : ""}`}
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{task.name}</p>
                            <p>
                              {format(task.startDate, "MMM d, yyyy")} -{" "}
                              {format(task.endDate, "MMM d, yyyy")}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

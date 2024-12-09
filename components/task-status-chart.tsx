"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 8 },
  { name: "In Progress", value: 4 },
  { name: "Not Started", value: 3 },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
];

export function TaskStatusChart() {
  return (
    <ChartContainer
      config={{
        completed: {
          label: "Completed",
          color: COLORS[0],
        },
        inProgress: {
          label: "In Progress",
          color: COLORS[1],
        },
        notStarted: {
          label: "Not Started",
          color: COLORS[2],
        },
      }}
      className="h-[250px]"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
}

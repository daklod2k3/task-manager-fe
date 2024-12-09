"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "To Do", value: 10 },
  { name: "In Progress", value: 5 },
  { name: "Done", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function TaskStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={300} className={"mx-auto"}>
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
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

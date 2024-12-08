"use client";

import React from "react";
import {
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const LoadTask = ({ taskDepartments }: { taskDepartments: any[] }) => {

  if (taskDepartments.length == 0) {
    return <div>No Task in Department</div>;
  }

  return (
    <>
      {taskDepartments.map((item) => (
          <li key={item.id} className="rounded-md bg-secondary/50 p-3">
            <h4 className="flex items-center font-semibold">
              {item.progress === 100 ? (
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
              )}
              {item.task.title}
            </h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="mt-2 flex items-center">
              <span className="ml-2 text-sm font-medium">Status: </span>
              <span className="ml-2 text-sm font-medium text-primary">
                {item.task.status}
              </span>
            </div>
          </li>
        ))}
    </>
  );
};

export default LoadTask;

"use client";

import Kanban from "@/components/task/kanban";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

export default function Component() {
  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <Kanban />
    </div>
  );
}

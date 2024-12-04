"use client";

import { DepartmentList } from "@/components/department/DepartmentList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateDept from "./CreateDept";

export default function ClientDept() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-0 w-full flex-col p-4">
      <h1 className="mb-10 text-4xl font-bold text-primary">
        Department Management
      </h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
          <Input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            aria-label="Search departments"
          />
        </div>
        <CreateDept />
      </div>
      <DepartmentList searchTerm={searchTerm} />
    </div>
  );
}

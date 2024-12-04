import { useDepartment } from "@/hooks/use-department";
import { Building } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function DepartmentLink({
  department_id,
}: {
  department_id: number;
}) {
  const { data: department, isLoading } = useDepartment({ id: department_id });
  console.log(department);

  if (isLoading) return <Skeleton />;
  return (
    <Link
      href={"/department/" + department_id}
      className="flex w-fit flex-wrap items-center gap-2 rounded bg-blue-500 px-3 py-2 font-bold text-white"
    >
      <Avatar>
        <AvatarFallback className="text-blue-500">
          {/* {String(department.name[0]).toLocaleUpperCase()} */}
          <Building />
        </AvatarFallback>
      </Avatar>
      {department.name}
    </Link>
  );
}

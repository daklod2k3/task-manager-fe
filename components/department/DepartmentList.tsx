"use client";

import AlertButton from "@/components/department/AlertButton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDepartmentContext } from "@/context/department-context";
import { Briefcase, Pencil, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import { ToastAction } from "../ui/toast";
import LoadPeople from "./LoadPeople";
import { Progress } from "@/components/ui/progress";

export function DepartmentList({ searchTerm }: { searchTerm: string }) {
  const { deptAllFetch, toast, deleteDept } = useDepartmentContext();
  const [depa, setDepa] = useState<any[]>([]);

  useEffect(() => {
    if (deptAllFetch.data) {
      console.log(deptAllFetch.data)
      setDepa(deptAllFetch.data);
    }
  }, [deptAllFetch.data]);

  const filteredDepartments = useMemo(() => {
    return depa.filter((dept) =>
      dept.department.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [depa, searchTerm]);

  const deleteDepaById = async (id: number) => {
    try {
      const res = await deleteDept(id);
      console.log(res);
      toast({
        description: "Deleted department successfully",
      });
      deptAllFetch.mutate();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="h-screen w-full rounded-xl">
      {deptAllFetch.isLoading ? (
        <Loading />
      ) : (
        <ScrollArea className="min-h-[calc(100vh-200px)] h-[calc(100vh-200px)] px-2">
          <div>
            {filteredDepartments.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No departments found.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 pb-6 md:grid-cols-2">
                {filteredDepartments.map((dept) => (
                  <div key={dept.department.id} className="group">
                    <div className="rounded-xl border-l-4 border-l-blue-500 bg-white p-6 shadow transition-all duration-200 hover:border-green-500 hover:shadow-md">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-pink-700 group-hover:text-pink-800">
                          {dept.department.name}
                        </h3>
                        <div className="flex space-x-3 opacity-0 transition-opacity group-hover:opacity-100">
                          <Link href={`/department/${dept.department.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-pink-50"
                            >
                              <Pencil className="h-4 w-4 text-pink-500" />
                            </Button>
                          </Link>
                          <AlertButton
                            confirmButtonLabel="Delete"
                            title="Do you want to delete this department?"
                            onAction={() => {
                              deleteDepaById(dept.department.id);
                            }}
                          >
                            <Button size="icon">
                              <Trash2 />
                            </Button>
                          </AlertButton>
                        </div>
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2 font-medium">Owner:</span>
                          <span className="text-gray-800">
                            <LoadPeople
                              showOwner={true}
                              departmentUsers={dept.department.department_users}
                            />
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="mr-2 h-4 w-4 text-pink-500" />
                          <span>{dept.department.department_users.length} members</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="mr-2 h-4 w-4 text-pink-500" />
                          <span>{dept.department.task_departments.length} tasks</span>
                        </div>
                        <div className="flex items-center font-medium text-gray-800">
                        <span>{dept.completion_percentage}% Complete</span>
                        </div>
                      </div>
                      <Progress value={dept.completion_percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

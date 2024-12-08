"use client";

import LoadPeople from "@/components/department/LoadPeople";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDepartmentContext } from "@/context/department-context";
import { useDepartment } from "@/hooks/use-department";
import { ArrowLeft, Briefcase, Building, Pencil, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastAction } from "../ui/toast";
import AddDeptUser from "./AddDeptUser";
import LoadTask from "./LoadTask";
import Loading from "../Loading";

export default function ClientDeptId({ id }: { id: number }) {
  const router = useRouter();
  const [department, setDepartment] = useState<any>({});
  const [newName, setNewName] = useState<string>("");
  const [deptName, setDeptName] = useState<string>("");
  const [isEditingName, setIsEditingName] = useState(false);
  const { data: departmentUserData, isLoading,mutate } = useDepartment({
    id,
    includes: "DepartmentUsers,TaskDepartments",
  });
  const {toast, updateNameDept } = useDepartmentContext();

  useEffect(() => {
    const fetchData = async () => {
      if (departmentUserData) {
        console.log(departmentUserData[0].department_users)
        setDepartment(departmentUserData[0])
        setNewName(departmentUserData[0].name);
      }
    };
    fetchData();
  }, [departmentUserData]);

  const handleNameEdit = () => {
    setDeptName(newName);
    HandleNameData();
    setIsEditingName(false);
  };

  const HandleNameData = async () => {
    try {
      const data = [
        {
          op: "replace",
          path: "/name",
          value: newName,
        },
      ];
      await updateNameDept(id, data);
      mutate();
      toast({
        description: "successfully add department",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "add department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="w-full h-screen p-4">
      <Button
        variant="ghost"
        onClick={() => router.push("/department")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Department
      </Button>
      <Card className="h-auto border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="max-w-sm text-3xl font-bold text-primary py-4"
                />
                <Button onClick={handleNameEdit}>Save</Button>
              </div>
            ) : (
              <CardTitle className="text-3xl font-bold text-primary flex items-center">
                <Building size={26}/>
                {isLoading ? <Loading/> : <span>{department.name}</span>}
              </CardTitle>
            )}
            {!isEditingName && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditingName(true)}
              >
                <Pencil className="h-4 w-4 text-primary" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-auto grid gap-6 md:grid-cols-2">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employees</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="mb-4 min-h-[calc(100vh-400px)] h-[calc(100vh-400px)]">
                  <ul className="space-y-4 pr-4">
                    <LoadPeople
                      mutate={mutate}
                      isLoading={isLoading}
                      departmentUsers={department.department_users || []}
                    />
                  </ul>
                </ScrollArea>
                <AddDeptUser
                  idDept={id}
                  mutate={mutate}
                  nameDept={department.name || ""}
                  departmentUsers={department.department_users || []}
                />
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                <Briefcase className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="min-h-[calc(100vh-400px)] h-[calc(100vh-400px)]">
                  <ul className="space-y-4 pr-4">
                    <LoadTask taskDepartments={department.task_departments || []} />
                  </ul>
                </ScrollArea>
                <Link href={`/department/${id}/task`}>
                  <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

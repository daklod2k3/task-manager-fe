"use client";

import { useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDepartmentContext } from "@/context/department-context";
import { Ellipsis, Info, EllipsisVertical } from "lucide-react";
import EditDepartment from "@/components/department/EditDepartment";
import AlertButton from "@/components/department/AlertButton";
import { deleteDepartment } from "@/action/Department";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { useDepartment } from "@/hooks/use-department";
import Loading from "../Loading";
import LoadPeople from "./LoadPeople";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ScrollArea } from "@/components/ui/scroll-area"
import LoadTask from "./LoadTask";

interface SettingDepartmentProps {
    id: number;
}

export default function DepartmentDetail({ idDepartment }: { idDepartment: number }) {
  const [deptName, setDeptName] = useState<string | null>(null);
  const [deptUser, setDeptUser] = useState<any[]>([]);
  const [deptTask, setDeptTask] = useState<any[]>([]);
  const departmentFetch = useDepartment(idDepartment);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (departmentFetch.data) {
        if (departmentFetch.data.length > 0) {
          setDeptName(departmentFetch.data[0].name);
          setDeptUser(departmentFetch.data[0].department_user);
          setDeptTask(departmentFetch.data[0].task_department)
        } else {
          setDeptName(null);
        }
      }
    };
    fetchData();
  }, [departmentFetch.data]);

  const deleteDepaById = async () => {
    try {
      router.push("/department");
      await deleteDepartment(idDepartment);
      toast({
        description: "Deleted department successfully",
      });
      departmentFetch.mutate();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      });
    }
  };

  const SettingDepartment: React.FC<SettingDepartmentProps> = ({ id }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <EditDepartment idDepartment={id} />
        <AlertButton
          btnIcon="trash"
          openButtonLabel="Delete"
          title="Bạn có chắc muốn xóa"
          actionLabel="Delete"
          onAction={() => deleteDepaById()}
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {departmentFetch.isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : deptName ? (
        <>
          <aside className="w-fit h-full p-4 bg-white border-r">
            <h1 className="text-xl font-bold mb-4">{deptName}</h1>
            <div className="flex items-center mb-4">
              <Button className="w-full flex-1 mr-2">Add people</Button>
              <SettingDepartment id={idDepartment} />
            </div>
            <div className="max-w-xs h-full p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Members</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">{deptUser.length} member</p>
              <hr className="mb-4" />
              <ScrollArea className="h-[60vh] w-fit max-h-[60vh] rounded-md">
                <div className="flex items-center flex-wrap">
                  {deptUser.map((user,idx) => (
                    <LoadPeople className="flex w-full items-center mb-2 bg-primary/10 p-2 rounded cursor-pointer" showLoading={idx < 1} showName={true} showAvt={true} showPosition={true} key={user.user_id} id={user.user_id} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </aside>
          <main className="flex-1 p-6">
            <div className="flex justify-between">
              <Button className="mb-2">Add task</Button>
              <Button className="mb-2">
                <Link href={"/department"}>Back</Link>
              </Button>
            </div>
            <section className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="mb-2">Task Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 h-4/5">
                    {deptTask.map(
                      (task, index) => (
                        <LoadTask className="flex mb-3 items-center" showIcon={true} showDoing={true} showName={true} showDesc={true} key={index} id={task.task_id}/>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </>
      ) : (
        <div className="w-full flex items-center justify-center">
          <p className="mr-2">Department not found</p>
          <Button>
            <Link href={"/department"}>Click to back</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import { Tables } from "@/entity/database.types";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/Avatar";
import { useDepartmentContext } from "@/context/department-context";
import { EllipsisVertical, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { deleteDepartment } from "@/action/Department";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import CreateDepartment from "@/components/department/CreateDepartment";
import EditDepartment from "@/components/department/EditDepartment";
import AlertButton from "@/components/department/AlertButton";
import SearchUser from "@/components/department/SearchDepartment";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import LoadPeople from "./LoadPeople";
import LoadTask from "./LoadTask";

interface SettingDepartmentProps {
  id: number;
}

export default function TableDepartment() {
  const ITEMS_PER_PAGE = 10;
  const [depa, setDepa] = useState<any[]>([]);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { departmentAllFetch } = useDepartmentContext();
  const { toast } = useToast();
  
  useEffect(() => {
    if (departmentAllFetch.data) {
      setDepa(departmentAllFetch.data);
    }
  }, [departmentAllFetch.data]);

  const deleteDepa = async () => {
    for (const id of checkList) {
      try {
        await deleteDepartment(id);
        toast({
          description: "Deleted department successfully",
        });
        departmentAllFetch.mutate();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Delete department error",
          description: String(error),
          action: <ToastAction altText="Try again">Please Try again</ToastAction>,
        });
      }
    }
  };

  const deleteDepaById = async (id: number) => {
    try {
      await deleteDepartment(id);
      toast({
        description: "Deleted department successfully",
      });
      departmentAllFetch.mutate();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      });
    }
  };

  const SettingDepartment: React.FC<SettingDepartmentProps> = ({ id }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <EllipsisVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <EditDepartment idDepartment={id}/>
          <AlertButton
            btnIcon="trash"
            openButtonLabel="Delete"
            title="Bạn có chắc muốn xóa"
            actionLabel="Delete"
            onAction={() => deleteDepaById(id)}
          />
        </PopoverContent>
      </Popover>
    );
  };

  const addCheckList = (id: number) => {
    setCheckList((prevCheckList) =>
      prevCheckList.includes(id)
        ? prevCheckList.filter((item) => item !== id)
        : [...prevCheckList, id]
    );
  };

  const currentData = depa.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(depa.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getNameById = (id:number) => {
    
  }

  return (
    <div className="flex w-full h-screen bg-background">
      <div className="flex-1 p-8">
        <div className="text-xl font-semibold mb-3">Department</div>
        <div className="flex justify-between items-center mb-3">
          <div className="w-1/4">
            <SearchUser onClickItem={getNameById}/>
          </div>
          <div className="flex gap-2">
            {checkList.length > 0 && (
              <AlertButton openButtonLabel="Delete Department" onAction={deleteDepa} />
            )}
            <CreateDepartment />
          </div>
        </div>

        {departmentAllFetch.isLoading ? (
          <div className="w-full h-screen flex items-start justify-center">
            <Loader2 className="animate-spin text-primary" size={28} />
            <h1 className="text-xl text-primary mr-2">Loading Department</h1>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>Department ID</TableHead>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Department Owner</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Tasks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell>
                      <input
                        onClick={() => addCheckList(dept.id)}
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>{dept.id}</TableCell>
                    <TableCell><Link title="Click view detail" href={"/department/" + dept.id}>{dept.name}</Link></TableCell>
                    <TableCell>
                      {dept.department_users.filter(user => user.owner_type === "owner").length > 0 ? (
                        dept.department_user
                          .filter(user => user.owner_type === "owner")
                          .map(user => (
                            <div key={user.user_id} className="flex items-center gap-2">
                              <LoadPeople className="flex items-center" showName={true} key={user.user_id} id={user.user_id} showAvt={true} />
                            </div>
                          ))
                      ) : (
                        <span>không có</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link className="flex w-fit items-center" title="Click view detail" href={"/department/" + dept.id}>
                        {dept.department_users.length > 0 
                          ? dept.department_users.map((user,idx) => (
                            <LoadPeople className={idx < 5 ? "mr-1" : ""} showLoading={idx < 0} key={user.user_id} id={user.user_id} showAvt={true && idx < 5}/>
                          )) 
                          : "Chưa có ai"}
                        {dept.department_users.length > 4 && <span className="text-2xl text-primary">...</span>}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-[200px] min-w-[200px]">
                      <Link 
                        className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis" 
                        title="Click view detail" 
                        href={"/department/" + dept.id}
                      >
                        {dept.task_departments.length > 0 
                          ? dept.task_departments.map((task, idx) => (
                              <React.Fragment key={task.task_id}>
                                {idx !== 0 && <span className="text-xl h-[40px] mx-0.5">,</span>}
                                {/* <LoadTask 
                                  className="w-fit truncate" 
                                  showLoading={idx < 0} 
                                  id={task.task_id} 
                                  showName={true && idx < 5} 
                                /> */}
                              </React.Fragment>
                            ))
                          : "Chưa có công việc"}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-2 border-t">
              <Button
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
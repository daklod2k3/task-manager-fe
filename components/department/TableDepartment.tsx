"use client";

import React, { useEffect, useState } from "react";
import { Tables } from "@/entity/database.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/Avatar";
import { useDepartmentContext } from "@/context/department-context";
import {EllipsisVertical } from 'lucide-react';
import { deleteDepartment, updateDepartment } from "@/action/Department";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import CreateDepartment from "@/components/department/CreateDepartment";
import EditDepartment from "@/components/department/EditDepartment";
import AlertButton from "@/components/department/AlertButton";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SettingDepartmentProps {
  id: number;
}
  
  export default function TableDepartment() {
    const [depa, setDepa] = useState<Tables<"departments">[]>([]);
    const [checkList, setCheckList] = useState<number[]>([]);
    const { departmentFetch } = useDepartmentContext();
    const {toast} = useToast();
    
    useEffect(() => {
      if (departmentFetch.data) {
        setDepa(departmentFetch.data);
      }
    }, [departmentFetch.data]);

    const deleteDepa = async () => {
      for (const id of checkList) {
        try {
          await deleteDepartment(id);
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
      }
    };    
    const deleteDepaById = async (id:number) => {
      try {
        await deleteDepartment(id);
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

    const SettingDepartment: React.FC<SettingDepartmentProps> = ({ id }) => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <EditDepartment/>
            <AlertButton 
              openButtonLabel="Delete"
              title="bạn có chắc muốn xóa"
              actionLabel="Delete"
              onAction={() => {deleteDepaById(id)}}
              />
          </PopoverContent>
        </Popover>
      );
    };

    const addCheckList = (id: number) => {
      console.log(checkList)
      setCheckList((prevCheckList) => 
        prevCheckList.includes(id)
          ? prevCheckList.filter((item) => item !== id)
          : [...prevCheckList, id]
      );
    };

    return (
      <div className="flex w-full h-screen bg-background">
        {/* Sidebar */}
        <div className="w-64 border-r p-4 space-y-4">
          <div className="font-medium">Expense and Travel Management</div>
          <nav className="space-y-2">
            {["Budget", "Department", "Category", "Mileage", "Financial year", "Employee", "Currency conversion", "Policy"].map(
              (item) => (
                <div
                  key={item}
                  className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md cursor-pointer"
                >
                  {item}
                </div>
              )
            )}
          </nav>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-xl font-semibold">Department</div>
            <div className="flex gap-2">
              {/* <Button variant="outline">Export</Button> */}
              {checkList.length > 0 ? <AlertButton 
                openButtonLabel="Delete Department"
                onAction={deleteDepa}
                />:""}
              <CreateDepartment/>
            </div>
          </div>
  
          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>Department ID</TableHead>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Department Owner</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Complete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {depa.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell>
                      <input onClick={() => {addCheckList(dept.id)}} type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>{dept.id}</TableCell>
                    <TableCell>{dept.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8"></Avatar>
                        nam
                      </div>
                    </TableCell>
                    <TableCell>
                      <Avatar/>
                      </TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell className="w-[50px]">
                      <SettingDepartment id={dept.id}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-2 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rows per page:</span>
                <Select defaultValue="10">
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing 1 to 4 out of 4 entries
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
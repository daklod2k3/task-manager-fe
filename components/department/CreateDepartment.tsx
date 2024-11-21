"use client";

import React, { useState, useEffect } from "react";
import { date, z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { createDepartment } from "@/action/Department";
import { addDepartmentUser } from "@/action/DepartmentUser";
import { useDepartmentContext } from "@/context/department-context";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import AlertButton from "@/components/department/AlertButton";
import ButtonIcon from "@/components/department/ButtonIcon";
import { Badge } from "@/components/ui/badge";
import MyAvatar from "@/components/Avatar";
import SearchSelect, { PeopleSearchItem } from "@/components/search-select";
import { peopleToSearch, usePeople } from "@/hooks/use-people";

import {
  CalendarIcon,
  CheckSquare,
  ChevronRight,
  Edit,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Plus,
  Share2,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tables } from "@/entity/database.types";

export default function CreateDepartment() {
  const [open, setOpen] = useState(false);
  const {departmentFetch} = useDepartmentContext();
  const {toast} = useToast();
  const { data: peoples, isLoading: peopleLoading } = usePeople();
  const [assigneeSelect, setAssigneeSelect] = useState<Tables<"profiles">[]>([]);

  const removeAssignee = (x) => {
    setAssigneeSelect((prev) => prev.filter((value) => value.id !== x.id));
  };

  const addAssignee = (x) => {
    if (assigneeSelect.filter((item) => item.id == x.id).length > 0) return;
    setAssigneeSelect((prev) => [...prev, x]);
  };

  // chua lam
  // const teamSchema = z.object({
  //   teamName: z.string().min(1, "Team name is required"),
  //   members: z.string(),
  // });
  // useEffect(() => {
  //   if (userFetch.data) {
  //     setUsers(userFetch.data);
  //   }
  // }, [userFetch.data]);

  const teamSchema = z.object({
    name: z.string().min(1, "Team name is required"),
  });

  const CreateTeamForm: React.FC = () => {
    const form = useForm({
      resolver: zodResolver(teamSchema),
      defaultValues: {
        name: "",
      },
    });

    const onSubmit = async (formData) => {
      try {
        const resDept = await createDepartment(formData);
        console.log(resDept.data.id);

        assigneeSelect.forEach(async item => {
          const deptUser = {
            user_id: item.id,
            department_id: resDept.data.id,
            created_at: new Date().toISOString(),
            id: 0,
          }
          const res = await addDepartmentUser(deptUser);
        })
        
        departmentFetch.mutate();
        toast({
          description: "successfully add department",
        })
        setOpen(false);
        setAssigneeSelect([]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "add department error",
          description: String(error),
          action: <ToastAction altText="Try again">Please Try again</ToastAction>,
        })
      }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="member"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Owner</FormLabel>
                <FormControl>
                  <Input placeholder="Enter leader name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            name="member"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Members</FormLabel>
                <FormControl>
                  <>
                    <div className="flex flex-wrap gap-1">
                      {assigneeSelect.map((x) => (
                        <Badge key={x.id} className="flex gap-1 p-1">
                          <MyAvatar user={x} size={7} />
                          {x.name || x.id}
                          <X
                            size={18}
                            className="cursor-pointer rounded-full hover:bg-white hover:text-primary"
                            onClick={() => removeAssignee(x)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <SearchSelect
                      disable
                      isLoading={peopleLoading}
                      placeholder="Add members"
                      ItemRender={PeopleSearchItem}
                      modal={true}
                      onSelectedValueChange={(x) => {
                        console.log("click");
                        addAssignee(x);
                      }}
                      items={peopleToSearch(peoples || [])}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setAssigneeSelect([]);
                setOpen(false)
              }}
              className="w-full"
            >
              Cancel
            </Button>
            <AlertButton
              title="Do you want to add this department?"
              openButtonLabel="Create"
              onAction={form.handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </Form>
    );
  };

  return (
    <>
      <ButtonIcon 
        label="Create Department"
        onClick={() => {
          setAssigneeSelect([]);
          setOpen(true)}}
        nameIcon="plus"
        />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Department</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <CreateTeamForm />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

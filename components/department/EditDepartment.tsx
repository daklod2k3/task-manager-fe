"use client";

import React, { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { updateDepartment } from "@/action/Department";
import { useDepartmentContext } from "@/context/department-context";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import AlertButton from "@/components/department/AlertButton";

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

function EditDepartment({idDepartment}:{idDepartment:number}) {
  const [open, setOpen] = useState(false);
  const {departmentFetch} = useDepartmentContext();
  const {toast} = useToast();

  // chua lam
  // const teamSchema = z.object({
  //   teamName: z.string().min(1, "Team name is required"),
  //   members: z.string(),
  // });

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
        console.log(formData.name)
        const data = [
          {
            op: "replace", 
            path: "/name", 
            value: formData.name,
          }
        ];
        await updateDepartment(idDepartment, data);
        departmentFetch.mutate();
        toast({
          description: "successfully add department",
        })
        setOpen(false);
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
                <FormLabel>New Department</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
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
          /> */}
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <AlertButton
              title="Do you want to edit this department?"
              openButtonLabel="Save"
              onAction={form.handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </Form>
    );
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full mb-2 px-4">
        Edit Department
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Name Department</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <CreateTeamForm />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditDepartment;
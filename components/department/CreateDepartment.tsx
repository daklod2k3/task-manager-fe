"use client";

import React, { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { addDepartmentSupabase } from "@/action/Department";
import { useDepartmentContext } from "@/context/department-context";

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

export default function CreateDepartment() {
  const [open, setOpen] = useState(false);
  const {departmentFetch} = useDepartmentContext();

  const teamSchema = z.object({
    teamName: z.string().min(1, "Team name is required"),
    teamLeader: z.string().min(1, "Team leader is required"),
  });

  const CreateTeamForm: React.FC = () => {
    const form = useForm({
      resolver: zodResolver(teamSchema),
      defaultValues: {
        teamName: "",
        teamLeader: "",
      },
    });

    const onSubmit = async (data) => {
      try {
        const departmentData = {
          name: data.teamName,
          created_at: new Date().toISOString(),
        };

        const res = await addDepartmentSupabase(departmentData);
        departmentFetch.mutate();
        setOpen(false);
      } catch (error) {
        console.error("Error creating team:", error);
      }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="teamLeader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Leader</FormLabel>
                <FormControl>
                  <Input placeholder="Enter leader name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-[85%] mb-2">
        Create team
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a team</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <CreateTeamForm />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

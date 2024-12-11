"use client";

import { useState,useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { usePermissionContext } from "@/context/permission-context"
import {DescriptionCustom} from "@/components/department/CustomToast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formDeptSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});

export default function FormAddRole({onClose}:{onClose: () => void}) {
  const {toast,roleFetch,addRol} =  usePermissionContext();

  type FormDeptType = z.infer<typeof formDeptSchema>;

  const form = useForm<FormDeptType>({
    resolver: zodResolver(formDeptSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await addRol(formData)
      onClose();
      roleFetch.mutate()
      console.log(res);
      toast({
        title: "Success",
        description: <DescriptionCustom>{"Added Role"}</DescriptionCustom>
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Add Error",
        description: String(error),
      });
    }
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter role name" {...field} />
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
                onClose();
              }}
              className="w-full"
            >
              Cancel
            </Button>
            <Button className="w-full" type="submit">Submit</Button>
          </div>
      </form>
    </Form>
  )
}

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
  id: z.number(),
  name: z.string(),
  path: z.string().min(1, "Department name is required"),
});

export default function FormEditResource({onClose,idResource,name,path}:{onClose: () => void,idResource: number,name:string,path:string}) {
  const {toast,resourceFetch,updateReso} =  usePermissionContext();
  type FormDeptType = z.infer<typeof formDeptSchema>;

  const form = useForm<FormDeptType>({
    resolver: zodResolver(formDeptSchema),
    defaultValues: {
      id: idResource,
      name: name,
      path: path,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await updateReso(formData)
      resourceFetch.mutate()
      console.log(res);
      onClose();
      toast({
        title: "Success",
        description: <DescriptionCustom>{"Edited Resource"}</DescriptionCustom>
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Edit Error",
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
              <FormLabel>Resource Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter role name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Path</FormLabel>
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
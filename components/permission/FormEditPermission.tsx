"use client";

import { useState,useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { usePermissionContext } from "@/context/permission-context"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const formDeptSchema = z.object({
  view: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

export default function FormEditPermission({onClose,idPermission,view,create,update,del}:{onClose: () => void,idPermission:number,view: boolean,create: boolean,update: boolean,del: boolean}) {
  const {toast,resourceFetch,updatePerm} =  usePermissionContext();

  type FormDeptType = z.infer<typeof formDeptSchema>;

  const form = useForm<FormDeptType>({
    resolver: zodResolver(formDeptSchema),
    defaultValues: {
      view: view,
      create: create,
      update: update,
      delete: del,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await updatePerm(idPermission,formData)
      resourceFetch.mutate()
      onClose();
      console.log(res);
      toast({
        description: "successfully add department",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "add department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      })
    }
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between">
        {["view", "create", "update", "delete"].map((item) => (
            <FormField
              key={item}
              name={item}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FormLabel htmlFor={field.name}>
                        {"set " + item}
                      </FormLabel>
                      <Checkbox
                        id={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

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

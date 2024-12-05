"use client";

import { useState,useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Checkbox } from "@/components/ui/checkbox"
import { addPermission } from "@/action/Permission";
import { useToast } from "@/hooks/use-toast";
import { useResource } from "@/hooks/use-permission"

const formDeptSchema = z.object({
  view: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
  resource_id: z.number(),
  role_id: z.number(),
});

export default function FormAddRole({onClose,roleId}:{onClose: () => void,roleId:number}) {
  const {data:resourceFetch, isLoading:loadResource, mutate} = useResource();
  const [resource, setResource] = useState<any[]>([]);
  const {toast} = useToast();
    
  useEffect(() => {
    if(resourceFetch) {
      console.log(resourceFetch)
      setResource(resourceFetch)
    }
  }, [resourceFetch])

  type FormDeptType = z.infer<typeof formDeptSchema>;

  const form = useForm<FormDeptType>({
    resolver: zodResolver(formDeptSchema),
    defaultValues: {
      view: false,
      create: false,
      update: false,
      delete: false,
      resource_id: 0,
      role_id: roleId,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await addPermission(formData)
      mutate()
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
      <FormField
        name="resource_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resource</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={String(field.value) || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resource">
                    {resource.find(item => item.id === field.value)?.path || "Select resource"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {resource.map(item => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.path}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
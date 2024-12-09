"use client";

import { useState,useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePermissionContext } from "@/context/permission-context"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Loading from "../Loading";
import { usePeople } from "@/hooks/use-people";
import { updateUser } from "@/action/User";

const formDeptSchema = z.object({
  name: z.string(),
  bio: z.string(),
  avt: z.string(),
  role_id: z.number(),
});

export default function FormEditUser({onClose,userId,name,bio,avt,role_id}:{onClose: () => void,
  userId:string,name:string,bio:string,avt:string,role_id:number}) {
    const {mutate} = usePeople({})
    const {toast,roleFetch} =  usePermissionContext();
    const [roleData, setRoleData] = useState<any[]>([])

  useEffect(() => {
    if(roleFetch.data) {
      setRoleData(roleFetch.data)
    }
  }, [roleFetch.data])
  
  type FormDeptType = z.infer<typeof formDeptSchema>;

  const form = useForm<FormDeptType>({
    resolver: zodResolver(formDeptSchema),
    defaultValues: {
      name: name,
      bio: bio,
      avt: avt,
      role_id: role_id,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await updateUser(userId,formData)
      console.log(res);
      console.log(formData);
      mutate();
      onClose();
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Enter bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="avt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input placeholder="Enter avatar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="role_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Owner</FormLabel>
              <FormControl>
                {roleFetch.isLoading ? (
                  <Loading />
                ) : (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(Number(value)); // Chuyển đổi và cập nhật giá trị số
                    }}
                    value={field.value?.toString() || ""} // Giá trị hiện tại dưới dạng chuỗi
                  >
                    <SelectTrigger className="w-full h-[46px] min-h-[46px]">
                      <SelectValue
                        placeholder={
                          roleData.find((r) => r.id === field.value)?.name || "Select an owner"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        {roleData.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id.toString()} // Sử dụng id làm giá trị
                            className="cursor-pointer"
                          >
                            <div className="flex w-full items-center capitalize">
                              <span className="ml-2">{item.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
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
            <Button className="w-full" type="submit">Save</Button>
          </div>
      </form>
    </Form>
  )
}

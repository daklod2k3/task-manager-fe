"use client";

import { useState,useEffect } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import MyAvatar from "../Avatar";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import SearchSelect from "@/components/search-select";
import { peopleToSearch, usePeople } from "@/hooks/use-people";
import { useDepartmentContext } from "@/context/department-context";

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

import { Tables } from "@/entity/database.types";
import { DescriptionCustom } from "./CustomToast";

const formDeptSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  department_users: z.array(
    z.object({
      user_id: z.string(),
      owner_type: z.string(),
    })
  ).optional(),
});

export default function FormCreateDept({onClose}:{onClose: () => void}) {
  const { data: peopleFetch, isLoading } = usePeople({});
  const [peoples, setPeoples] = useState<Tables<"profiles">[]>([]);
  const [peoplesNoOwner, setPeoplesNoOwner] = useState<Tables<"profiles">[]>([]);
  const [peoplesHasOwner, setPeoplesHasOwner] = useState<Tables<"profiles">[]>([]);

  const {createDept,deptAllFetch,toast} = useDepartmentContext();
  const [deptMember, setDeptMember] = useState<Tables<"profiles">[]>([]);

  type FormDeptType = z.infer<typeof formDeptSchema>;

  const form = useForm<FormDeptType>({
    resolver: zodResolver(formDeptSchema),
    defaultValues: {
      name: "",
      department_users: [],
    },
  });

  const filterOwner = (id: string) => {
    const filteredPeoples = peoples.filter(person => person.id !== id);
    const filteredPeoplesHasOwner = filteredPeoples.filter(
      person => !deptMember.some(member => member.id === person.id)
    );
  
    console.log(filteredPeoplesHasOwner);
    setPeoplesNoOwner(filteredPeoplesHasOwner);
  };

  useEffect(() => {
    if(peopleFetch) {
      setPeoples(peopleFetch);
      setPeoplesNoOwner(peopleFetch)
      setPeoplesHasOwner(peopleFetch)
    }
  }, [peopleFetch]);

  const removeAssignee = (x) => {
    setPeoplesHasOwner((prev) => [...prev, x])
    setPeoplesNoOwner((prev) => [...prev, x])
    setDeptMember((prev) => prev.filter((value) => value.id !== x.id));
  };

  const addAssignee = (x) => {
    if (deptMember.filter((item) => item.id == x.id).length > 0) return;
    setPeoplesHasOwner((prev) => prev.filter((value) => value.id !== x.id))
    setPeoplesNoOwner((prev) => prev.filter((value) => value.id !== x.id))
    setDeptMember((prev) => [...prev, x]);
  };

  const onSubmit = async (formData) => {
    try {
      const resDept = await createDept(formData);
      console.log(resDept);
      deptAllFetch.mutate();
      onClose();
      toast({
        title: `Success`,
        description: <DescriptionCustom>{`added department: ${formData.name}`}</DescriptionCustom>,
      })
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
              <FormLabel>Department Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter department name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="department_users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Owner</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const updatedMembers = field.value || [];
                    const newOwner = { user_id: value, owner_type: "owner" };
                    filterOwner(newOwner.user_id)
                    field.onChange([...updatedMembers.filter((m) => m.owner_type !== "owner"), newOwner]);
                  }}
                  value={field.value?.find((m) => m.owner_type === "owner")?.user_id || ""}
                >
                  <SelectTrigger className="w-full h-[46px] min-h-[46px]">
                    <SelectValue placeholder="Select an owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Members</SelectLabel>
                      {peoplesHasOwner.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="flex w-full items-center">
                            <MyAvatar user={item}/>
                            <span className="ml-2">{item.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="department_users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Members</FormLabel>
              <FormControl>
                <>
                  <div className="flex flex-wrap gap-1">
                      {deptMember.map((x) => (
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
                      isLoading={isLoading}
                      placeholder="Add Member"
                      modal={true}
                      variant="people"
                      onSelectedValueChange={(x) => {
                        addAssignee(x);
                      }}
                      items={peopleToSearch(peoplesNoOwner || [])}
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
                setDeptMember([]);
                onClose();
              }}
              className="w-full"
            >
              Cancel
            </Button>
            <Button 
              className="w-full"
              type="submit" 
              onClick={() => {
                const currentUsers = form.getValues("department_users") || [];
                const newMembers = deptMember.map((member) => ({
                  user_id: member.id,
                  owner_type: "member",
              }));

              const updatedUsers = [...currentUsers, ...newMembers];

              form.setValue("department_users", updatedUsers);
            }}>Submit</Button>
          </div>
      </form>
    </Form>
  )
}

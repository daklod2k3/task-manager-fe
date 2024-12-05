"use client";

import { useState,useEffect } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import MyAvatar from "../Avatar";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import SearchSelect from "@/components/search-select";
import { peopleToSearch, usePeople } from "@/hooks/use-people";
import { useDepartmentContext } from "@/context/department-context";
import { updateDepartmentUser } from "@/action/DepartmentUser";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Tables } from "@/entity/database.types";

type DepartmentUser = {
  id: number;
  created_at: string;
  department_id: number;
  owner_type: string;
  user_id: string;
};

type LoadOwnerProps = {
  onClose: () => void;
  idDept:number;
  nameDept: string;
  departmentUsers: DepartmentUser[];
  setDeptUser: React.Dispatch<React.SetStateAction<any[]>>;
};

const formDeptSchema = z.object({
  id: z.number().min(1, "Department name is required"),
  name: z.string().min(1, "Department name is required"),
  department_users: z.array(
    z.object({
      user_id: z.string(),
      owner_type: z.string(),
    })
  ).optional(),
});

const FormAddDeptUser: React.FC<LoadOwnerProps> = ({ departmentUsers,onClose,nameDept,idDept,setDeptUser }) =>{
  const { data: peopleFetch, isLoading } = usePeople();
  const [peoples, setPeoples] = useState<Tables<"profiles">[]>([]);
  const [peoplesNoOwner, setPeoplesNoOwner] = useState<Tables<"profiles">[]>([]);

  const {updateDept,deptAllFetch,toast} = useDepartmentContext();
  const [deptMember, setDeptMember] = useState<Tables<"profiles">[]>([]);
  
  type FormDeptType = z.infer<typeof formDeptSchema>;

  const form = useForm<FormDeptType>({
    resolver: zodResolver(formDeptSchema),
    defaultValues: {
      id: Number(idDept),
      name: nameDept,
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
      setDeptUser(departmentUsers)
      setPeoples(peopleFetch);
      const userDeptNo = peopleFetch.filter(person =>
        !departmentUsers.some(deptUser => deptUser.user_id === person.id)
      );
      setPeoplesNoOwner(userDeptNo)
    }
  }, [peopleFetch]);

  const removeAssignee = (x) => {
    setPeoplesNoOwner((prev) => [...prev, x])
    setDeptMember((prev) => prev.filter((value) => value.id !== x.id));
  };

  const addAssignee = (x) => {
    if (deptMember.filter((item) => item.id == x.id).length > 0) return;
    setPeoplesNoOwner((prev) => prev.filter((value) => value.id !== x.id))
    setDeptMember((prev) => [...prev, x]);
  };

  const onSubmit = async (formData) => {
    try {
      console.log(formData)
      const resDept = await updateDept(formData);
      console.log(resDept);
      deptAllFetch.mutate();
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
          name="department_users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Members</FormLabel>
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
              setDeptUser([...departmentUsers, ...newMembers]);
              const updatedUsers = [...departmentUsers, ...newMembers];

              form.setValue("department_users", updatedUsers);
              onClose();
            }}>Submit</Button>
          </div>
      </form>
    </Form>
  )
}

export default FormAddDeptUser;
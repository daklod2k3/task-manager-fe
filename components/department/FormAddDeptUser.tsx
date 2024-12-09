"use client";

import { useState,useEffect } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import MyAvatar from "../Avatar";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import SearchSelect from "@/components/search-select";
import { peopleToSearch, usePeople } from "@/hooks/use-people";
import { useDepartmentContext } from "@/context/department-context";
import { addDepartmentUser } from "@/action/DepartmentUser";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Tables } from "@/entity/database.types";
import { DescriptionCustom } from "./CustomToast";
type LoadOwnerProps = {
  onClose: () => void;
  mutate: () => void;
  idDept:number;
  nameDept: string;
  departmentUsers: any[];
};

const formDeptSchema = z.object({
  department_users: z.array(
    z.object({
      user_id: z.string(),
      owner_type: z.string(),
      department_id: z.number()
    })
  ).optional(),
});

const FormAddDeptUser: React.FC<LoadOwnerProps> = ({ mutate,departmentUsers,onClose,nameDept,idDept }) =>{
  const { data: peopleFetch, isLoading } = usePeople({});
  const [peoples, setPeoples] = useState<Tables<"profiles">[]>([]);
  const [peoplesNoOwner, setPeoplesNoOwner] = useState<Tables<"profiles">[]>([]);

  const {updateDept,deptAllFetch,toast} = useDepartmentContext();
  const [deptMember, setDeptMember] = useState<Tables<"profiles">[]>([]);
  
  type FormDeptType = z.infer<typeof formDeptSchema>;

  const form = useForm<FormDeptType>({
    resolver: zodResolver(formDeptSchema),
    defaultValues: {
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
      console.log(formData.department_users)
      const resDept = await addDepartmentUser(formData.department_users);
      console.log(resDept);
      mutate();
      toast({
        title: "Success",
        description:<DescriptionCustom>{`Added member to ${nameDept}`}</DescriptionCustom>,
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
                  department_id: Number(idDept),
              }));
              // setDeptUser([...departmentUsers, ...newMembers]);
              const updatedUsers = [ ...newMembers];

              form.setValue("department_users", updatedUsers);
              onClose();
            }}>Submit</Button>
          </div>
      </form>
    </Form>
  )
}

export default FormAddDeptUser;
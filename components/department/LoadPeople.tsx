"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { updateOwner,deleteDepartmentUser } from "@/action/DepartmentUser";
import { useDepartmentContext } from "@/context/department-context";
import MyAvatar from '@/components/Avatar';
import AlertButton from "./AlertButton";
import SelectPosition from "./SelectPosition";
import { DescriptionCustom } from "./CustomToast";

type LoadOwnerProps = {
  mutate: () => void;
  isLoading?: boolean;
  departmentUsers: any[];
};

const LoadPeople: React.FC<LoadOwnerProps> = ({ mutate,departmentUsers,isLoading }) => {
  const {toast} = useDepartmentContext();

  const HandleOwner = async (id:number, name:string) => {
    try {
      console.log(id, name);
      const res = await updateOwner(id, name);
      console.log(res)
      mutate();
      toast({
        title: `Success`,
        description: <DescriptionCustom>{`change ${id} type to ${name}`}</DescriptionCustom>,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Edit Error",
        description: String(error),
      });
    }
  }

  const handleDeleteDeptUser = async (id:number, name:string) => {
    try {
      const res = await deleteDepartmentUser(id);
      mutate();
      toast({
        title: `Success`,
        description: <DescriptionCustom>{`Deleted member: ${name}`}</DescriptionCustom>,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Error",
        description: String(error),
      });
    }
  }

  // const handleDeleteUi = (id: number) => {
  //   setUserData((prev) => prev.filter((user) => user.id !== id));
  //   if(setDeptUser) {
  //     setDeptUser((prev) => prev.filter((user) => user.id !== id));
  //   }
  // };

  // const handleSelectChange = (value) => {
  //   setSelectedValue(value);
  // };

  useEffect(() => {
    console.log(departmentUsers)
  //   if (departmentUsers.length > 0) {
  //     const ownerUser = departmentUsers
  //       .filter((user) => user.name === "Owner")
  //       .map((user) => {
  //         return people.find((person: any) => person.id === user.user_id);
  //       })
  //       .find((user) => user !== undefined); 

  //     setUserOwner(ownerUser || null);

  //     const users = departmentUsers
  //       .map((user) => {
  //         const person = people.find((person: any) => person.id === user.user_id);
  //         if (person) {
            
  //           return {
  //             id: user.id,
  //             id_user: person.id,
  //             name: person.name,
  //             owner_type: user.owner_type, 
  //           };
  //         }
  //         return undefined;
  //       })
  //       .filter((user) => user !== undefined); 
  //       setUserData(users || []);
  //   }
  }, [departmentUsers]);

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      {departmentUsers.length > 0 ? (
        departmentUsers.map((item) => (
          <li key={item.user.user_id} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
            <div className="flex items-center space-x-2">
              <MyAvatar />
              <span className="font-medium">{item.user.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <SelectPosition user={item} HandleOwner={HandleOwner} />
              <AlertButton title={`delete user in department ${item.id}`} onAction={() => {
                  handleDeleteDeptUser(item.id,item.user.name)
                  // handleDeleteUi(user.id)
                }}>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertButton>
            </div>
          </li>
        ))
      ) : (
        <span>No other users</span>
      )}
      
    </div>
  );
};

export default LoadPeople;
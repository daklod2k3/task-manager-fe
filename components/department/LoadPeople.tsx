"use client";

import React, { useEffect, useState } from "react";
import { usePeople } from "@/hooks/use-people";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MyAvatar from '@/components/Avatar';
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { ToastAction } from '../ui/toast'
import { updateOwner,deleteDepartmentUser } from "@/action/DepartmentUser";
import { useDepartmentContext } from "@/context/department-context";
import AlertButton from "./AlertButton";
import SelectPosition from "./SelectPosition";

type DepartmentUser = {
  id: number;
  created_at: string;
  department_id: number;
  owner_type: string;
  user_id: string;
};

type LoadOwnerProps = {
  showOwner: boolean;
  setDeptUser?: React.Dispatch<React.SetStateAction<any[]>>;
  departmentUsers: DepartmentUser[];
};

const LoadPeople: React.FC<LoadOwnerProps> = ({ departmentUsers, showOwner,setDeptUser }) => {
  const { data: people, isLoading } = usePeople();
  const {deptAllFetch,toast} = useDepartmentContext();
  const [userOwner, setUserOwner] = useState<any>(null);
  const [userData, setUserData] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();

  const HandleOwner = async (id:number, name:string) => {
    try {
      console.log(id, name);
      const res = await updateOwner(id, name);
      console.log(res)
      deptAllFetch.mutate();
      toast({
        description: "successfully edit owner type",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "add department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      })
    }
  }

  const handleDeleteDeptUser = async (id:number) => {
    try {
      const res = await deleteDepartmentUser(id);
      deptAllFetch.mutate();
      toast({
        description: "successfully delete",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "add department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      })
    }
  }

  const handleDeleteUi = (id: number) => {
    setUserData((prev) => prev.filter((user) => user.id !== id));
    if(setDeptUser) {
      setDeptUser((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (people && departmentUsers.length > 0) {
      const ownerUser = departmentUsers
        .filter((user) => user.owner_type === "Owner")
        .map((user) => {
          return people.find((person: any) => person.id === user.user_id);
        })
        .find((user) => user !== undefined); 

      setUserOwner(ownerUser || null);

      const users = departmentUsers
        .map((user) => {
          const person = people.find((person: any) => person.id === user.user_id);
          if (person) {
            
            return {
              id: user.id,
              id_user: person.id,
              name: person.name,
              owner_type: user.owner_type, 
            };
          }
          return undefined;
        })
        .filter((user) => user !== undefined); 
        setUserData(users || []);
    }
  }, [people, departmentUsers]);

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  if (!userOwner) {
    return <div>No owner</div>;
  }

  if (showOwner) {
    return (
      <span className="text-primary font-bold text-base capitalize">
        {userOwner.name}
      </span>
    );
  }

  return (
    <div>
      {userData.length > 0 ? (
        userData.map((user) => (
          <li key={user.id_user} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
            <div className="flex items-center space-x-2">
              <MyAvatar />
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <SelectPosition user={user} HandleOwner={HandleOwner} />
              <AlertButton title="delete user in department" onAction={() => {
                  handleDeleteDeptUser(user.id)
                  handleDeleteUi(user.id)
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
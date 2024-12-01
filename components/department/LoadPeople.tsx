"use client";

import React, { useEffect, useState } from "react";
import { usePeople } from "@/hooks/use-people";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MyAvatar from '@/components/Avatar';
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

type DepartmentUser = {
  id: number;
  created_at: string;
  department_id: number;
  owner_type: string;
  user_id: string;
};

type LoadOwnerProps = {
  showOwner: boolean;
  departmentUsers: DepartmentUser[];
};

const LoadPeople: React.FC<LoadOwnerProps> = ({ departmentUsers, showOwner }) => {
  const { data: people, isLoading } = usePeople();
  const [userOwner, setUserOwner] = useState<any>(null);
  const [userData, setUserData] = useState<any[]>([]);

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
              id: person.id,
              name: person.name,
              owner_type: user.owner_type, 
            };
          }
          return undefined;
        })
        .filter((user) => user !== undefined); 
        setUserData(users || []);
        console.log(users)
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
          <li key={user.id} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
            <div className="flex items-center space-x-2">
              <MyAvatar />
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder={user.owner_type}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
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
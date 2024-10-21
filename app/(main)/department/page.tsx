"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users,Ellipsis,User,Search  } from "lucide-react";
import React, { useState } from "react";

type DepartmentUser = {
  id: string;
  position: string;
  user_id: string;
  name: string;
};

type Column = {
  id: string;
  title: string;
  slogan: string,
  departmentUser: DepartmentUser[];
};

// Initial data
const initialData: { [key: string]: Column } = {
    depa1: {
      id: "depa-1",
      title: "Frontend",
      slogan: "gay team",
      departmentUser: [
        {
          id: "name-1",
          position: "leader",
          user_id: "john-1",
          name: "John"
        },
        {
          id: "name-2",
          position: "member",
          user_id: "alice-1",
          name: "Alice"
        },
        {
          id: "name-3",
          position: "member",
          user_id: "bob-1",
          name: "Bob"
        },
        {
          id: "name-4",
          position: "member",
          user_id: "susan-1",
          name: "Susan"
        }
      ],
    },
    depa2: {
      id: "depa-2",
      title: "Backend",
      slogan: "gay team",
      departmentUser: [
        {
          id: "name-1",
          position: "leader",
          user_id: "mike-1",
          name: "Mike"
        },
        {
          id: "name-2",
          position: "member",
          user_id: "kevin-1",
          name: "Kevin"
        },
        {
          id: "name-3",
          position: "member",
          user_id: "linda-1",
          name: "Linda"
        },
        {
          id: "name-4",
          position: "member",
          user_id: "tina-1",
          name: "Tina"
        },
        {
          id: "name-5",
          position: "member",
          user_id: "steve-1",
          name: "Steve"
        }
      ],
    },
    depa3: {
      id: "depa-3",
      title: "QA",
      slogan: "gay team",
      departmentUser: [
        {
          id: "name-1",
          position: "leader",
          user_id: "sara-1",
          name: "Sara"
        },
        {
          id: "name-2",
          position: "member",
          user_id: "luke-1",
          name: "Luke"
        }
      ],
    },
    depa4: {
      id: "depa-4",
      title: "Marketing",
      slogan: "gay team",
      departmentUser: [
        {
          id: "name-1",
          position: "leader",
          user_id: "anna-1",
          name: "Anna"
        },
        {
          id: "name-2",
          position: "member",
          user_id: "leo-1",
          name: "Leo"
        },
        {
          id: "name-3",
          position: "member",
          user_id: "mia-1",
          name: "Mia"
        }
      ],
    },
    depa5: {
      id: "depa-5",
      title: "HR",
      slogan: "gay team",
      departmentUser: [
        {
          id: "name-1",
          position: "leader",
          user_id: "sophie-1",
          name: "Sophie"
        },
        {
          id: "name-2",
          position: "member",
          user_id: "liam-1",
          name: "Liam"
        }
      ],
    }
};

export default function Department() {
  const [columns, setColumns] = useState(initialData);
  const [currentID, setCurrentID] = useState('');
  const [members, setMembers] = useState<DepartmentUser[]>([]);

  const getDepartmentCurrent = (id: string) => {
    setCurrentID(id);
    const foundColumn = Object.values(columns).find((column) => column.id === id);
    if (foundColumn) {
      setMembers(foundColumn.departmentUser);
    }
  };

  const getLength = (id: string): number => {
    const foundColumn = Object.values(columns).find((column) => column.id === id);
    if (foundColumn) {
      return foundColumn.departmentUser.length;
    }
    return 0;
  };

  const getTitle = (): string => {
    const foundColumn = Object.values(columns).find((column) => column.id === currentID);
    if (foundColumn) {
      return foundColumn.title;
    }
    return '';
  };

  return (
    <div className="flex p-4">
      <div className="flex-1 mr-4">
        <div>
          <h2 className="text-lg font-semibold mb-6">People and teams</h2>
          <div className="flex relative">
            <Input className="pl-8" placeholder="Sreach for people and teams"/>
            <Search className="absolute" />
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium">People</h3>
          <div className="flex">
            <div>
              <User/>
              <p>Your teammate</p>
              <Button>Add people</Button>
            </div>
            <div>
              <User/>
              <p>Nam</p>
              <Button>Add people</Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium">People</h3>
          <div className="flex">
            <div>
              <User/>
              <p>Your new team!</p>
              <Button>Create team</Button>
            </div>
            <div>
              <p>Backend</p>
              <User/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
      {/* {Object.values(columns).map((column) => (
        <button 
          key={column.id}
          className={column.id === currentID ? '' : ''}
          onClick={() => getDepartmentCurrent(column.id)}
          >
          <div className="hover:bg-[#091E420F] flex items-center p-3 min-w-[120px]">
            <Users />
            <div className="flex flex-col ml-2 items-start">
              <p className="text-sm">{column.title}</p>
              <p className="text-xs opacity-65">{getLength(column.id)} member</p>
            </div>
          </div>
        </button>
      ))} */}
      <div className="group relative w-fit">
      </div>
        <h2 className="text-lg font-semibold mr-2">{getTitle()}</h2>
        <div className="min-w-[250px] max-w-[250px] flex mb-2">
          <Button 
            className="flex-1 mr-1 rounded"
            onClick={()=>{alert("chua lam")}}
          >
            Add people
          </Button>
          <Button 
            className="rounded"
            onClick={()=>{alert("chua lam")}}
          >
            <Ellipsis/>
          </Button>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-wrap p-4 rounded-lg w-fit max-w-[250px] min-w-[250px] shadow bg-gray-100 justify-around">
            <div className="flex flex-1 flex-wrap">
              <div className="flex flex-1 justify-between mb-2">
                <div>
                  <h2 className="text-lg font-semibold">Member</h2>
                  <span className="text-xs mb-2">{getLength(currentID)} member</span>
                </div>
                <h2 className="text-lg font-semibold mb-2">Position</h2>
              </div>
              <div className="flex flex-wrap w-full">
                {Object.values(members).map((member) => (
                  <div key={member.id} className="flex bg-white p-2 mb-2 shaw rounded w-full justify-between cursor-pointer">
                    <div className="flex">
                      <User className="mr-1"/>
                      <p key={member.id}>{member.name}</p>
                    </div>
                    <p key={member.id}>{member.position}</p>
                  </div>
                ))}
              </div>
              <a className="w-full mt-2" href="/task">
                <Button className="w-full rounded">Task</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

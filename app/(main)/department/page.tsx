"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";
import { CircleX,Ellipsis,User  } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

type DepartmentUser = {
  id: string;
  position: string;
  user_id: string;
  name: string;
};

type Column = {
  id: string;
  title: string;
  departmentUser: DepartmentUser[];
};

// Initial data
const initialData: { [key: string]: Column } = {
    depa1: {
      id: "depa1",
      title: "Frontend",
      departmentUser: [
        {
          id: "name1",
          position: "leader",
          user_id: "john-1",
          name: "John"
        },
        {
          id: "name2",
          position: "member",
          user_id: "alice-1",
          name: "Alice"
        },
        {
          id: "name3",
          position: "member",
          user_id: "bob-1",
          name: "Bob"
        },
        {
          id: "name4",
          position: "member",
          user_id: "susan-1",
          name: "Susan"
        }
      ],
    },
    depa2: {
      id: "depa2",
      title: "Backend",
      departmentUser: [
        {
          id: "name1",
          position: "leader",
          user_id: "mike-1",
          name: "Mike"
        },
        {
          id: "name2",
          position: "member",
          user_id: "kevin-1",
          name: "Kevin"
        },
        {
          id: "name3",
          position: "member",
          user_id: "linda-1",
          name: "Linda"
        },
        {
          id: "name4",
          position: "member",
          user_id: "tina-1",
          name: "Tina"
        },
        {
          id: "name5",
          position: "member",
          user_id: "steve-1",
          name: "Steve"
        }
      ],
    },
    depa3: {
      id: "depa3",
      title: "QA",
      departmentUser: [
        {
          id: "name1",
          position: "leader",
          user_id: "sara-1",
          name: "Sara"
        },
        {
          id: "name2",
          position: "member",
          user_id: "luke-1",
          name: "Luke"
        }
      ],
    },
    depa4: {
      id: "depa4",
      title: "Marketing",
      departmentUser: [
        {
          id: "name1",
          position: "leader",
          user_id: "anna-1",
          name: "Anna"
        },
        {
          id: "name2",
          position: "member",
          user_id: "leo-1",
          name: "Leo"
        },
        {
          id: "name3",
          position: "member",
          user_id: "mia-1",
          name: "Mia"
        }
      ],
    },
    depa5: {
      id: "depa5",
      title: "HR",
      departmentUser: [
        {
          id: "name1",
          position: "leader",
          user_id: "sophie-1",
          name: "Sophie"
        },
        {
          id: "name2",
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
  const [edit, setEdit] = useState(false);
  const [nameTeam, setnameTeam] = useState('');


  const getDepartmentCurrent = (id: string) => {
    setCurrentID(id);
    const foundColumn = Object.values(columns).find((column) => column.id === id);
    if (foundColumn) {
      setMembers(foundColumn.departmentUser);
      setnameTeam(foundColumn.title)
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

  const card = () => {
    return <div className="flex flex-col items-center bg-white rounded shadow min-w-[120px] w-[23%]">
        <div className="flex flex-1 w-full bg-gray-100 items-center justify-center rounded min-w-[150px] min-h-[50px]">
          <User/>
        </div>
        <p className="my-3">Your new team!</p>
        <Button 
          className="w-[85%] mb-2"
          onClick={() => addTeam()}
        >
          Create team
        </Button>
      </div>
  };

  const team = (name: string, id: string) => {
    return <button 
          className="flex flex-col items-center bg-white rounded shadow min-w-[120px] w-[23%]"
          onClick={() => getDepartmentCurrent(id)}
          >
        <div className="flex flex-1 w-full bg-gray-100 items-center justify-center rounded min-h-[50px]"></div>
        <p className="my-3">{name}</p>
        <div className="mb-2 flex items-center justify-center w-full">
          <User/>
          <User/>
          <User/>
        </div>
      </button>
  };

  const addTeam = () => {
    const id = `depa${Object.keys(columns).length + 1}`;

    setColumns({
      ...columns,  // Sao chép các department hiện tại
      [id]: {
        id: id,
        title: "new",
        departmentUser: [],
      }
    });
    console.log(columns)
    console.log(Object.keys(columns).length)
  };

  const addPeopleToTeam = (teamId: string) => {
    const name = `name${Object.keys(columns[teamId].departmentUser).length + 1}`;
    setColumns({
      ...columns,
      [teamId]: {
        ...columns[teamId],
        departmentUser: [
          ...columns[teamId].departmentUser,
          {
            id: name,
            position: "member",
            user_id: "lol-1",
            name: name
          }
        ], 
      },
    });
    setMembers([
      ...columns[teamId].departmentUser,
      {
        id: name,
        position: "member",
        user_id: "lol-1",
        name: name
      }]);
  }

  const editValueTeam = () => {
    setEdit(prevEdit => !prevEdit)
  }

  const handleChangeNameTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnameTeam(event.target.value);
  };

  const handleChangeMember = (id: string, field: string, value: string) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? { ...member, [field]: value }
          : member
      )
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
  }

  return (
    <div className="flex p-4">
      <div className="flex-1 mr-4">
        <div>
          <h2 className="text-lg font-semibold mb-6">Teams</h2>
          <SearchInput placeholder="Search for teams"/>
        </div>
        <div>
          <h3 className="text-base font-medium mt-6 mb-4">teams</h3>
          <div className="flex flex-wrap gap-3 w-full">
            {card()}
            {Object.values(columns).map((column) => (
              team(column.title, column.id)
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
      <div className="group relative w-fit">
      </div>
        {edit ? <Input 
                            className="min-w-[250px] w-full text-lg font-semibold mb-5" 
                            value={nameTeam}
                            onChange={handleChangeNameTeam}
                            /> 
                            :<h2 className="text-lg font-semibold mb-5">{nameTeam}</h2>}
        <div className="min-w-[250px] w-full flex mb-2">
          <Button 
            className="flex-1 mr-1 rounded"
            onClick={()=>{addPeopleToTeam(currentID)}}
          >
            Add people
          </Button>

          <Button 
            className="rounded"
            onClick={()=>{editValueTeam(currentID)}}
          >
            <Ellipsis/>
          </Button>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-wrap p-4 rounded-lg w-full min-w-[250px] shadow bg-gray-100 justify-around">
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
                  edit ? (
                    <div 
                      key={member.id} 
                      className="flex bg-white p-2 mb-2 shadow rounded w-full justify-between cursor-pointer"
                    >
                      <div className="flex flex-1">
                        <Input
                          value={member.name}
                          onChange={(e) => handleChangeMember(member.id, 'name', e.target.value)}
                        />
                        <Input
                          value={member.position}
                          onChange={(e) => handleChangeMember(member.id, 'position', e.target.value)}
                        />  
                        <Button onClick={() => {deleteMember(member.id)}}><CircleX /></Button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      key={member.id} 
                      className="flex bg-white p-2 mb-2 shadow rounded w-full justify-between cursor-pointer"
                    >
                      <div className="flex items-center">
                        <User className="mr-1"/>
                        <p>{member.name}</p>
                      </div>
                      <p>{member.position}</p>
                    </div>
                  )
                ))}
              </div>
              {edit ? <div className="flex flex-1 justify-around mt-3">
                <Button 
                  className="w-1/3 rounded"
                  onClick={() => {editValueTeam()}}
                  >Save</Button>
                <Button 
                  className="w-1/3 rounded"
                  onClick={() => {getDepartmentCurrent(currentID)}}>
                  Cancel
                  </Button>
                </div> 
                : <a className="w-full mt-2" href="/task">
                <Button className="w-full rounded">Task</Button>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";

import { CircleX, Loader2  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tables } from "@/entity/database.types";
import { useDepartmentContext } from "@/context/department-context";
import { deleteDepartmentSupabase } from "@/action/Department";
import { usePeople } from "@/hooks/use-people";
import SearchUser from "@/components/department/SearchUser";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

export default function DepartmentDetail() {
  const { departmentFetch, departmentUserFetch} = useDepartmentContext();
  const userFetch = usePeople();
  const [open, setOpen] = useState(false);
  const search = new URLSearchParams(window.location.search);
  const {toast} = useToast();

  const [teams, setTeams] = useState<Tables<"departments">[]>([]);
  const [users, setUsers] = useState<Tables<"profiles">[]>([]);
  const [teamUsers, setTeamUsers] = useState<Tables<"department_user">[]>([]);
  const [currTeam, setCurrTeam] = useState<number>(0);

  const [valueInput, setValueInput] = useState<string>("");
  const [editTeamName, setEditTeamName] = useState<boolean>(false);
  const [editTable, setEditTable] = useState<boolean>(false);

  useEffect(() => {
    console.log(departmentUserFetch.data)
    if (departmentUserFetch.data) {
      setTeamUsers(departmentUserFetch.data);
    }
  }, [departmentUserFetch.data]);
  
  useEffect(() => {
    if (userFetch.data) {
      setUsers(userFetch.data);
    }
  }, [userFetch.data]);
  
  useEffect(() => {
    if (departmentFetch.data) {
      setTeams(departmentFetch.data);
    }
  }, [departmentFetch.data]);

  useEffect(() => {
    const departmentId = Number(search.get("department_id"));
    if(departmentId) {
      setCurrTeam(departmentId)
      setOpen(true);
    }
  }, [search]);

  const RenderTable: React.FC = () => {
    if(departmentUserFetch.isLoading) {
      return (
        <Button disabled className="h-24 w-56">
          <Loader2 className="animate-spin" />
          Please wait
        </Button>
      )
    } else {
      return (
        <Table>
          <TableBody>
            {teamUsers.map((user) => (
              <TableRow key={user.id} className="bg-white">
                <TableCell className="font-medium py-3">{handleUser.getNameById(user.user_id ?? '')}</TableCell>
                <TableCell className="flex justify-end">
                  <Button onClick={() => {handleTeamUser.deleteMemberById(user.id)}}><CircleX /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }
  }

  const deleteDepartment = async () => {
    try {
      const res = await deleteDepartmentSupabase(currTeam);
      departmentFetch.mutate();
      toast({
        description: "deleted department",
      })
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "delete department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      })
      console.error("Error creating team:", error);
    }
  }

  const deleteKey = () => {
    search.delete('department_id');
    const url = new URL(window.location.href);
    url.search = search.toString();
    window.history.pushState({}, '', url.toString());
  }

  const handleData = {
    reset: () => {
    },
    save: () => {
    }
  };

  const handleTeam = {
    addTeam: (name: string) => {
      const id = teams.length + 2;
      const newTeam = {
        id,
        name,
        created_at: new Date().toISOString(),
      };
      setTeams([...teams, newTeam]); 
    },
    getNameByid: (id: number) => {
      const foundUser = Object.values(teams).find((team) => team.id == id);
      return foundUser? foundUser.name : '';
    },
    setNameById: (id: number, value: string) => {
      setTeams((prevTeams) => 
        prevTeams.map((team) => 
          team.id === id 
            ? { ...team, name: value } 
            : team 
        )
      );
    }
  }

  const handleUser = {
    getNameById: (userID: string) => {
      console.log(users)
      return users.find((user) => user.id === userID)?.name ?? '';
    },
    getMemberByTeamID: (teamID: number) => {
      // const members = teams
      //   .filter(team => team.id === teamID)
      //   // .flatMap(team => team.department_users);
      // return members;
      // return 
    },
    getIdByName: (name: string) => {
      const foundUser = Object.values(users).find((user) => user.name === name);
      return foundUser? foundUser.id : '';
    },
    setNameByID: (userID: string, newName: string) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userID ? { ...user, name: newName } : user
        )
      );
    },
  }

  const handleTeamUser = {
    generateUniqueID: (existingIDs: number[]): number => {
      let newID;
      do {
        newID = Math.floor(Math.random() * 9000000000) + 1000000000;
      } while (existingIDs.includes(newID));
      return newID;
    },
    addMemberToTeam: (teamID: number, name: string) => {
      const existingIDs = teamUsers.map((user) => user.id);
      const newUserTeamID = handleTeamUser.generateUniqueID(existingIDs);

      setTeamUsers((prevTeamUsers) => [
        ...prevTeamUsers,
        {
          id: newUserTeamID,
          created_at: new Date().toISOString(),
          department_id: teamID,
          user_id: handleUser.getIdByName(name),
        },
      ]);
    },
    deleteMemberById: (id: number) => {
      const updatedTeamUsers = teamUsers.filter(member => member.id !== id);
      setTeamUsers(updatedTeamUsers);
    },
    getMemberByDepartmentId: (departmentId: number) => {
      return 
    }
  }

  return (
    <div className={open ? "flex-1 bg-primary/10 h-fit p-3 shadow rounded" : "hidden"}>
      <div className="w-full flex justify-end">
        <Button onClick={() => {
            deleteKey()
            setOpen(false)
          }}>
          <CircleX/>
        </Button>
      </div>
      {editTeamName ? <Input
                        className="text-lg font-semibold mb-4 mt-4"
                        ref={(input) => {
                          if (input) {
                            input.focus();
                          }
                        }}
                        value={valueInput}
                        onChange={e => (setValueInput(e.target.value))}
                        onBlur={() => {setEditTeamName((prev: any) => !prev)}}
                      />
                    : <h2 className="text-lg font-semibold mb-4 mt-4"
                        onClick={() => {
                          setEditTeamName((prev: any) => !prev)
                          setValueInput(handleTeam.getNameByid(currTeam))
                        }}
                      >{handleTeam.getNameByid(currTeam)}</h2>
      }
      <div className="flex gap-3">
        <div className="flex flex-wrap p-4 rounded-lg w-full shadow bg-gray-100 justify-around">
          <div className="flex flex-1 flex-wrap">
            <div className="flex flex-1 justify-between mb-2">
              <div>
                <h2 className="text-lg font-semibold">Member</h2>
                <span className="text-xs mb-2">{teamUsers.length} member</span>
              </div>
              {/* <h2 className="text-lg font-semibold mb-2">Position</h2> */}
            </div>
            <div className="mb-2 w-full flex">
              <SearchUser onAddUserToTeam={handleTeamUser.addMemberToTeam}/>
            </div>
            <div className="flex flex-wrap w-full h-fit max-h-[520px] overflow-y-scroll">
              <RenderTable/>
            </div>
              <div className="flex flex-1 justify-around mt-3">
                {editTable || editTeamName ? 
                <>
                  <Button 
                    className="w-1/4 rounded"
                    onClick={() => {
                      setEditTable(prev => !prev)
                      handleData.save()
                    }}
                    >Save
                  </Button>
                  <Button 
                    className="w-1/4 rounded"
                    onClick={() => {
                      setEditTable(prev => !prev)
                      handleData.reset()
                      }}>
                    Cancel
                  </Button>
                </>
                  :""
                }
                <Button 
                  className="w-1/4 rounded"
                  onClick={() => {
                    deleteKey()
                    deleteDepartment();
                  }}>
                  Delete Department
                </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
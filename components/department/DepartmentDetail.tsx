"use client";

import React, { useState, useEffect } from "react";
import { CircleX, Loader2  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tables } from "@/entity/database.types";
import { useDepartmentContext } from "@/context/department-context";
import { deleteDepartment, updateDepartment } from "@/action/Department";
import { usePeople } from "@/hooks/use-people";
import SearchUser from "@/components/department/SearchUser";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import AlertButton from "@/components/department/AlertButton";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

export default function DepartmentDetail() {
  const { departmentFetch, setMount} = useDepartmentContext();
  const userFetch = usePeople();
  const [open, setOpen] = useState(false);
  const search = new URLSearchParams(window.location.search);
  const {toast} = useToast();

  const [teams, setTeams] = useState<Tables<"departments">[]>([]);
  const [users, setUsers] = useState<Tables<"profiles">[]>([]);
  const [teamUsers, setTeamUsers] = useState<Tables<"department_user">[]>([]);
  const [currTeam, setCurrTeam] = useState<number>(0);

  const [valueInput, setValueInput] = useState<string>("");
  const [editTable, setEditTable] = useState<boolean>(false);
  const [editTeamName, setEditTeamName] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(departmentUserFetch.data)
  //   if (departmentUserFetch.data) {
  //     setTeamUsers(departmentUserFetch.data);
  //   }
  // }, [departmentUserFetch.data]);
  
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
    if(departmentFetch.isLoading) {
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

  const deleteKey = () => {
    search.delete('department_id');
    const url = new URL(window.location.href);
    url.search = search.toString();
    window.history.pushState({}, '', url.toString());
  }

  const deleteDepa = async () => {
    try {
      await deleteDepartment(currTeam);
      setSave(false);
      setEditTeamName(false);
      toast({
        description: "deleted department successfully",
      })
      setOpen(false);
      deleteKey();
      departmentFetch.mutate();
      setMount(prev => !prev);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "delete department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      })
    }
  }

  const updateDepa = async () => {
    try {
      const data = [
        {
          op: "replace", 
          path: "/name", 
          value: valueInput
        }
      ];
      setSave(false);
      setEditTeamName(false);
      departmentFetch.mutate();
      const res = await updateDepartment(currTeam, data);
      toast({
        title: "updated department successfully",
        description :  JSON.stringify(res),
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "update department error",
        description: String(error),
        action: <ToastAction altText="Try again">Please Try again</ToastAction>,
      })
    }
  }

  const handleTeam = {
    getNameByid: (id: number) => {
      const foundUser = Object.values(teams).find((team) => team.id == id);
      return foundUser ? foundUser.name : '';
    },
  }

  const handleUser = {
    getNameById: (userID: string) => {
      console.log(users)
      return users.find((user) => user.id === userID)?.name ?? '';
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
            setSave(false);
            setEditTeamName(false);
            deleteKey();
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
                        onChange={e => {
                          setSave(true);
                          (setValueInput(e.target.value))
                        }}
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
                {save && <AlertButton 
                  actionLabel="save"
                  title="Do you want to save this department?"
                  description="This action cannot be undone."
                  onAction={updateDepa} 
                  openButtonLabel="Save" />}
                <AlertButton 
                  actionLabel="Delete"
                  title="Do you want to delete this department?"
                  description="This action cannot be undone."
                  onAction={deleteDepa} 
                  openButtonLabel="Delete Department" />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
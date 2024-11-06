"use client";

import React, { useState,useCallback, useEffect } from "react";
import { useDepartmentContext } from "@/context/department-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleX,Loader2  } from "lucide-react";
import Avatar from "@/components/Avatar"
import { Tables } from "@/entity/database.types";
import { TeamList,TeamUserList,userList } from "@/entity/testData";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

interface CommandClickItemProps {
  onClickItem?: () => void;
  onAddUserToTeam?: (teamID: number, name: string) => void;
}

export default function Department() {
  const { departmentFetch } = useDepartmentContext();
  const [teams, setTeams] = useState(TeamList);
  const [users, setUsers] = useState(userList);
  const [teamUsers, setTeamUsers] = useState(TeamUserList);
  const [currTeam, setCurrTeam] = useState<number>(0);

  const [valueInput, setValueInput] = useState<string>("");
  const [valueMember, setValueMember] = useState<Tables<"department_user">[]>([]);
  const [editTeamName, setEditTeamName] = useState<boolean>(false);
  const [editTable, setEditTable] = useState<boolean>(false);

  useEffect(() => {
    if (departmentFetch.data) {
      setTeams(departmentFetch.data); 
    }
  }, [departmentFetch.data]);

  const CommandSearch: React.FC<CommandClickItemProps> = ({ onClickItem, onAddUserToTeam }) => {
    const [isInputActive, setIsInputActive] = useState(false);

    return (
      <Command className="rounded-lg border shadow-md relative overflow-visible">
        <CommandInput
          placeholder="search user..."
          onValueChange={(value) => setIsInputActive(value.trim() !== "")}
        />
        <CommandList className={isInputActive ? "absolute w-full top-full rounded shadow bg-white z-30" : "hidden"}>
          <CommandEmpty>Employee name not found</CommandEmpty>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <CommandItem>
                <button 
                  className="text-start w-full" 
                  onClick={() => {
                    onClickItem && onClickItem();
                    onAddUserToTeam && onAddUserToTeam(currTeam, user.name);
                  }
                }>{user.name}</button>
              </CommandItem>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </Command>
    );
  }

  const DialogAddTeam: React.FC = () => {
    const [open, setOpen] = useState(false);
  
    const teamSchema = z.object({
      teamName: z.string().min(1, "Team name is required"),
      teamLeader: z.string().min(1, "Team leader is required"),
    });
  
    const CreateTeamForm: React.FC = () => {
      const form = useForm({
        resolver: zodResolver(teamSchema),
        defaultValues: {
          teamName: "",
          teamLeader: "",
        },
      });
  
      const onSubmit = (data) => {
        console.log("Form Data:", data);
        handleTeam.addTeam(data.teamName)
        setOpen(false);
      };
  
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="teamLeader"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Leader</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter leader name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </div>
          </form>
        </Form>
      );
    };
  
    return (
      <>
        <Button onClick={() => setOpen(true)} className="w-[85%] mb-2">
          Create team
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a team</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <CreateTeamForm />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const cardTeam = (name: string, id?: number) => {
    const classBtn = id == undefined ? "flex basis-2/6 justify-center w-full" : "hidden"

    return (
      <div
        className="flex flex-col items-center cursor-pointer bg-white rounded shadow flex-1 basis-1/4 h-28 max-w-56 scroll-ml-1"
        onClick={() => 
          {if(id != undefined) {
            handleTeam.setCurrTeamID(id)
          }}}
        >
          <div className="basis-3/6 flex items-center bg-gray-100 w-full"></div>
          <p className="basis-1/6 mb-1 mt-2">{name}</p>
          <div className={classBtn}>
            <DialogAddTeam/>
          </div>
      </div>
    )
  };

  const RenderTeam: React.FC = () => {
    return (
      <>
        {cardTeam("Your new team")}
        {teams.map((team) => cardTeam(team.name, team.id))}
      </>
    )
  }

  const cardUser = (name: string,user?: Tables<"profiles">) => {
    return (
      <div
        className="flex flex-col items-center cursor-pointer bg-white rounded shadow flex-1 basis-1/4 h-36 max-w-56 scroll-ml-1"
        onClick={() => alert("show profile " + name)}>
          <div className="basis-3/6 flex items-center">
            <Avatar size={14} user={user} />
            </div>
          <p className="basis-1/6 my-1 ">{name}</p>
      </div>
    )
  };

  const handleData = {
    reset: () => {
      setTeams(TeamList)
      setUsers(userList)
      setTeamUsers(TeamUserList)
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
    setCurrTeamID: (id: number) => {
      setCurrTeam(id);
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
    getName: (userID: string) => {
      return users.find((user) => user.id === userID)?.name ?? '';
    },
    getMemberByTeamID: (teamID: number) => {
      const members = Object.values(teamUsers).filter(
        (user) => user.department_id === teamID
      );
      return members;
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
        newID = Math.floor(Math.random() * 9000000000) + 1000000000; // Tạo id ngẫu nhiên 10 chữ số
      } while (existingIDs.includes(newID));
      return newID;
    },
    addMemberToTeam: (teamID: number, name: string) => {
      const existingIDs = TeamUserList.map((user) => user.id);
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
    }
  }

  return (
    <div className="flex p-4">
      {/* Left column */}
      <div className="flex-1 mr-4">
        <div>
          <h2 className="font-semibold mb-6 text-primary text-2xl">People and teams</h2>
          <div className="min-w-[300px] max-w-[300px]">
            <CommandSearch onClickItem={() => {alert("show profile")}}/>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium mt-4 mb-2">People</h2>
          <div className="flex flex-wrap gap-3 w-full max-h-80 overflow-y-scroll bg-primary/10 pl-3 py-2 rounded">
            {Object.values(users).map((user) => cardUser(user.name,user))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium mt-4 mb-2">Teams</h2>
          <div className="flex flex-wrap gap-3 w-full max-h-64 overflow-y-scroll bg-primary/10 pl-3 py-2 rounded">
            {departmentFetch.data == undefined ? 
              <div className="w-full flex items-center justify-center">
                <Button disabled className="h-24 w-56">
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              </div> : <RenderTeam/>
            }
          </div>
        </div>
      </div>

      {/*Right column*/}
      <div className={currTeam !== 0 ? "flex-1" : "hidden"}>
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
                  <span className="text-xs mb-2">{handleUser.getMemberByTeamID(currTeam).length} member</span>
                </div>
                <h2 className="text-lg font-semibold mb-2">Position</h2>
              </div>
              <div className="mb-2 w-full flex">
                <CommandSearch onAddUserToTeam={handleTeamUser.addMemberToTeam}/>
              </div>
              <div className="flex flex-wrap w-full h-fit max-h-[520px] overflow-y-scroll">
                  {handleUser.getMemberByTeamID(currTeam).map((member) => (
                    editTable ? (
                      <div 
                        key={member.id}
                        className="flex bg-white p-2 mb-2 shadow rounded w-full justify-between cursor-pointer"
                      >
                        <div className="flex flex-1">
                          <Input
                            value={handleUser.getName(member.user_id ?? '')}
                            onChange={(e) => handleUser.setNameByID(member.user_id ?? '', e.target.value)}
                          />
                          <Input
                            className="mx-2"
                            value="member"
                            readOnly
                          />  
                          <Button onClick={() => {handleTeamUser.deleteMemberById(member.id)}}><CircleX /></Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        key={member.id} 
                        className="flex bg-white p-2 mb-2 shadow rounded w-full justify-between cursor-pointer"
                      >
                        <div 
                          className="flex items-center"
                          onClick={() => {
                            setValueMember(handleUser.getMemberByTeamID(currTeam))
                            setEditTable(prev => !prev)
                          }}
                          >
                          <p>{handleUser.getName(member.user_id ?? '')}</p>
                        </div>
                        <p onClick={() => {
                            setValueMember(handleUser.getMemberByTeamID(currTeam))
                            setEditTable(prev => !prev)}
                          }>member</p>
                      </div>
                    )
                  ))}
              </div>
              { editTable || editTeamName ?
                <div className="flex flex-1 justify-around mt-3">
                  <Button 
                    className="w-1/3 rounded"
                    onClick={() => {
                      setEditTable(prev => !prev)
                      handleData.save()
                    }}
                    >Save
                  </Button>
                  <Button 
                    className="w-1/3 rounded"
                    onClick={() => {
                      setEditTable(prev => !prev)
                      handleData.reset()
                      }}>
                    Cancel
                  </Button>
                </div>:""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

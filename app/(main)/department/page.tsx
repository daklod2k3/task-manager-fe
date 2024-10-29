"use client";

import React, { useState,useCallback  } from "react";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User,CircleX } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sendStatusCode } from "next/dist/server/api-utils";
import { Value } from "@radix-ui/react-select";

type UserType = {
  id: string;
  name: string;
};

type TeamType = {
  id: string;
  name: string;
};

type TeamUserType = {
  id: string;
  userID: string;
  teamID: string;
  position: string;
};

const initDataUser: { [key: string]: UserType } = {
  name1: { id: "name1", name: "Nam" },
  name2: { id: "name2", name: "Alice" },
  name3: { id: "name3", name: "Bob"},
  name4: { id: "name4", name: "Susan"},
  name5: { id: "name5", name: "Mike"},
  name6: { id: "name6", name: "Kevin"},
  name7: { id: "name7", name: "Linda"},
  name8: { id: "name8", name: "Tina"},
  name9: { id: "name9", name: "Steve"},
  name10: { id: "name10", name: "Sara"},
  name11: { id: "name11", name: "Luke"},
  name12: { id: "name12", name: "Anna"},
  name13: { id: "name13", name: "Leo"},
  name14: { id: "name14", name: "Mia"},
  name15: { id: "name15", name: "Sophie"},
  name16: { id: "name16", name: "Liam"},
};

const initDataTeam: { [key: string]: TeamType } = {
  depa1: { id: "depa1", name: "Frontend",},
  depa2: { id: "depa2", name: "Backend", },
  depa3: { id: "depa3", name: "QA", },
  depa4: { id: "depa4", name: "Marketing", },
  depa5: { id: "depa5", name: "HR", },
};

const initDataTeamUser: { [key: string]: TeamUserType } = {
  tu1: {id: "tu1", userID: "name1", teamID: "depa1", position: "leader" },
  tu2: {id: "tu2", userID: "name1", teamID: "depa2", position: "leader" },
  tu3: {id: "tu3", userID: "name1", teamID: "depa3", position: "leader" },
  tu4: {id: "tu4", userID: "name1", teamID: "depa4", position: "leader" },
  tu5: {id: "tu5", userID: "name1", teamID: "depa5", position: "leader" },
  tu6: {id: "tu6", userID: "name2", teamID: "depa1", position: "member" },
  tu7: {id: "tu7", userID: "name3", teamID: "depa2", position: "member" },
  tu8: {id: "tu8", userID: "name4", teamID: "depa3", position: "member" },
  tu9: {id: "tu9", userID: "name5", teamID: "depa4", position: "member" },
  tu10: {id: "tu10", userID: "name6", teamID: "depa5", position: "member" },
};

interface AutocompleteProps {
  placeholder?: string;
  onAdd?: (currTeam: string, name: string) => void;
}

export default function Department() {
  const [dataTeams, setDataTeams] = useState<{ [key: string]: TeamType }>(initDataTeam);
  const [dataUsers, setDataUsers] = useState<{ [key: string]: UserType }>(initDataUser);
  const [dataTeamUsers, setDataTeamUsers] = useState<{ [key: string]: TeamUserType }>(initDataTeamUser);
  
  const [teams, setTeams] = useState<{ [key: string]: TeamType }>(initDataTeam);
  const [users, setUsers] = useState<{ [key: string]: UserType }>(initDataUser);
  const [teamUsers, setTeamUsers] = useState<{ [key: string]: TeamUserType }>(initDataTeamUser);

  const [currTeam, setCurrTeam] = useState<string>("");

  const [valueInput, setValueInput] = useState<string>("");
  const [editTeamName, setEditTeamName] = useState<boolean>(false);
  const [editTable, setEditTable] = useState<boolean>(false);

  const Autocomplete: React.FC<AutocompleteProps> = ({ placeholder = "Tìm kiếm thành viên...", onAdd}) => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<UserType[]>([]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setQuery(inputValue);
  
      if (inputValue) {
        const filteredSuggestions = Object.values(initDataUser).filter(user =>
          user.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    };
  
    const handleSelect = (user: UserType) => {
      setQuery(user.name);  
      setSuggestions([]);   
      if (onAdd) {
        onAdd(currTeam, user.name); 
      }
    };
  
    return (
      <div className="relative w-full">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="border p-2 w-full rounded"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white shadow-lg rounded mt-1 w-full max-h-48 overflow-y-auto z-10">
            {suggestions.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelect(user)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const DialogCustom: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
  
    const onOpen = useCallback(() => setOpen(true), []);
    const onClose = useCallback(() => setOpen(false), []);
  
    const addTeam = useCallback((name: string) => {
      if (name !== "") {
        const id = `depa${Object.keys(teams).length + 1}`;
        setTeams((prevTeams) => ({
          ...prevTeams,
          [id]: {
            id: id,
            name: name,
          },
        }));
      }
    }, []);
  
    const handleCreate = useCallback(() => {
      onClose();
      addTeam(name);
    }, [onClose, addTeam, name]); // Thêm dependencies để đảm bảo tính đúng đắn
  
    return (
      <>
        <Button onClick={onOpen} className="w-[85%] mb-2">
          Create team
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a team</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="mb-4">
                <Label htmlFor="nameTeam">Team name</Label>
                <Input 
                  id="nameTeam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="nameMembers">Who should be in this team</Label>
                <Autocomplete />
              </div>
              <div className="flex justify-end">
                <Button onClick={onClose}>Cancel</Button>
                <Button className="ml-2" onClick={handleCreate}>Create</Button>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const cardTeam = (name: string, id: string) => {
    return (
      <button
        className="flex flex-col items-center bg-white rounded shadow min-w-[120px] w-[23%]"
        onClick={() => handleTeam.setCurrTeamID(id)}
      >
        <div className="flex flex-1 w-full bg-gray-100 items-center justify-center rounded min-h-[50px]"></div>
        <p className="my-3">{name}</p>
        <div className="mb-2 flex items-center justify-center w-full">
          <User />
          <User />
          <User />
        </div>
      </button>
    );
  };

  const handleData = {
    reset: () => {
      setTeams(dataTeams);
      setUsers(dataUsers);
      setTeamUsers(dataTeamUsers);
    },
    save: () => {
      setDataTeams(teams);
      setDataUsers(users);
      setDataTeamUsers(teamUsers);
    }
  };

  const handleTeam = {
    addTeam: (name: string) => {
      if(name != "") {
        const id = `depa${Object.keys(teams).length + 1}`;
        setTeams({
          ...teams,
          [id]: {
            id: id,
            name: name,
          },
        });
      }
    },
    setCurrTeamID: (id: string) => {
      setCurrTeam(id);
    },
    getNameByid: (id: string) => {
      const foundUser = Object.values(teams).find((team) => team.id === id);
      return foundUser? foundUser.name : '';
    },
    setNameByid: (id: string, value: string) => {
      setTeams((prevTeams) => ({
       ...prevTeams,
        [id]: {
         ...prevTeams[id],
          name: value,
        },
      }));
    }
  }

  const handleUser = {
    getName: (userID: string) => {
      const foundUser = Object.values(users).find((user) => user.id === userID);
      return foundUser ? foundUser.name : '';
    },
    getMemberByTeamID: (teamID: string) => {
      const members = Object.values(teamUsers).filter(
        (user) => user.teamID === teamID
      );
      return members;
    },
    getIdByName: (name: string) => {
      const foundUser = Object.values(users).find((user) => user.name === name);
      return foundUser? foundUser.id : '';
    }
  }

  const handleInput = {
    changeMember: (id: string, field: string, value: string) => {
      if (field === 'name') {
        setUsers((prevUsers) => ({
          ...prevUsers,
          [id]: {
            ...prevUsers[id],
            name: value,
          },
        }));
      } else {
        setTeamUsers((prevTeamUsers) => ({
          ...prevTeamUsers,
          [id]: {
            ...prevTeamUsers[id],
            [field]: value,
          },
        }));
      }
    },
    QueryChange: (query: string) => {
      console.log(query)
      setValueInput(query)
      handleTeamUser.addMemberToTeam(currTeam,valueInput)
    },
  }

  const handleTeamUser = {
    addMemberToTeam: (teamID: string, name: string) => {
      const lastId = Object.keys(teamUsers)
        .map((key) => parseInt(key.replace('tu', ''), 10)) 
        .reduce((maxId, currentId) => Math.max(maxId, currentId), 0); 

      const newMemberID = `tu${lastId + 1}`;

      setTeamUsers((prevTeamUsers) => ({
        ...prevTeamUsers,
        [newMemberID]: {
          id: newMemberID,
          userID: handleUser.getIdByName(name),
          teamID,
          position: 'member',
        },
      }));
    },
    deleteMemberById: (id: string) => {
      const updatedTeamUsers = { ...teamUsers };
      delete updatedTeamUsers[id];
      setTeamUsers(updatedTeamUsers);
    } 
  }

  return (
    <div className="flex p-4">
      {/* Left column */}
      <div className="flex-1 mr-4">
        <div>
          <h2 className="text-lg font-semibold mb-6">Teams</h2>
          <div className="min-w-[300px] max-w-[300px]">
            <Autocomplete/>
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium mt-6 mb-4">Teams</h3>
          <div className="flex flex-wrap gap-3 w-full">
            <div className="flex flex-col items-center bg-white rounded shadow min-w-[120px] w-[23%]">
              <div className="flex flex-1 w-full bg-gray-100 items-center justify-center rounded min-w-[150px] min-h-[50px]">
                <User />
              </div>
              <p className="my-2">Your new team!</p>
              <DialogCustom />
            </div>
            {Object.values(dataTeams).map((team) => cardTeam(team.name, team.id))}
          </div>
        </div>
      </div>

      {/*Right column*/}
      <div className={currTeam !== "" ? "flex-1" : "flex-1 hidden"}>
        {editTeamName ? <Input
                          className="text-lg font-semibold mb-6"
                          ref={(input) => {
                            if (input) {
                              input.focus();
                            }
                          }}
                          value={handleTeam.getNameByid(currTeam)}
                          onChange={e => (handleTeam.setNameByid(currTeam,e.target.value))}
                          onBlur={() => {setEditTeamName((prev: any) => !prev)}}
                        />
                      : <h2 className="text-lg font-semibold mb-6"
                          onClick={() => {
                            setEditTeamName((prev: any) => !prev)
                          }}
                        >{handleTeam.getNameByid(currTeam)}</h2>
        }
        <div className="flex gap-3">
          <div className="flex flex-wrap p-4 rounded-lg w-full min-w-[250px] shadow bg-gray-100 justify-around">
            <div className="flex flex-1 flex-wrap">
              <div className="flex flex-1 justify-between mb-2">
                <div>
                  <h2 className="text-lg font-semibold">Member</h2>
                  <span className="text-xs mb-2">{handleUser.getMemberByTeamID(currTeam).length} member</span>
                </div>
                <h2 className="text-lg font-semibold mb-2">Position</h2>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="mb-2 w-full flex">
                  <Autocomplete 
                    placeholder="nhập thành viên muốn thêm" 
                    onAdd={handleTeamUser.addMemberToTeam}/>
                  <Button 
                    className="ml-2"
                    onClick={() => {handleTeamUser.addMemberToTeam(currTeam,valueInput)}}
                    >Add people</Button>
                </div>
                {Object.values(handleUser.getMemberByTeamID(currTeam)).map((member) => (
                  editTable ? (
                    <div 
                      key={member.id}
                      className="flex bg-white p-2 mb-2 shadow rounded w-full justify-between cursor-pointer"
                    >
                      <div className="flex flex-1">
                        <Input
                          value={handleUser.getName(member.userID)}
                          onChange={(e) => handleInput.changeMember(member.userID, 'name', e.target.value)}
                        />
                        <Input
                          value={member.position}
                          onChange={(e) => handleInput.changeMember(member.id, 'position', e.target.value)}
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
                        onClick={() => {setEditTable(prev => !prev)}}
                        >
                        <User className="mr-1"/>
                        <p>{handleUser.getName(member.userID)}</p>
                      </div>
                      <p onClick={() => {setEditTable(prev => !prev)}}>{member.position}</p>
                    </div>
                  )
                ))}
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
    </div>
  );
}

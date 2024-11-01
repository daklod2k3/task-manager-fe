"use client";

import React, { useState,useCallback  } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User,CircleX } from "lucide-react";
import Avatar from "@/components/Avatar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

  const DialogAddTeam: React.FC = () => {
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

  const DialogAddUser: React.FC = () => {
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
          Add people
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

  const cardTeam = (name: string, id: string, add?: boolean) => {
    const classBtn = add ? "flex basis-2/6 justify-center w-full" : "hidden"
    return (
      <div
        className="flex flex-col items-center cursor-pointer bg-white rounded shadow flex-1 basis-1/4 h-36 max-w-56 scroll-ml-1"
        onClick={() => 
          {if(!add) {
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

  const cardUser = (name: string, add?: boolean) => {
    const classBtn = add ? "flex basis-2/6 justify-center w-full" : "hidden"
    return (
      <div
        className="flex flex-col items-center cursor-pointer bg-white rounded shadow flex-1 basis-1/4 h-36 max-w-56 scroll-ml-1">
          <div className="basis-3/6 flex items-center">
            <Avatar size={14} name="" imgSrc="data:image/png;base64,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"/>
          </div>
          <p className="basis-1/6 my-1 ">{name}</p>
          <div className={classBtn}>
            <DialogAddUser/>
          </div>
      </div>
    )
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
          <h2 className="text-lg font-semibold mb-6">People and teams</h2>
          <div className="min-w-[300px] max-w-[300px]">
            <Autocomplete/>
          </div>
        </div>
        <div>
          <h2 className="text-base font-medium mt-6 mb-4">People</h2>
          <div className="flex flex-wrap gap-3 w-full max-h-72 overflow-y-scroll">
            {cardUser("Your teammate",true)}
            {Object.values(users).map((user) => cardUser(user.name))}
          </div>
        </div>
        <div>
          <h2 className="text-base font-medium mt-6 mb-4">Teams</h2>
          <div className="flex flex-wrap gap-3 w-full">
            {cardTeam("Your new team","",true)}
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

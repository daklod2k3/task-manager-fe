"use client";

import { Loader2  } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

import { Tables } from "@/entity/database.types";
import { useDepartmentContext } from "@/context/department-context";
import CreateDepartment from "@/components/department/CreateDepartment";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DepartmentList() {
  const {departmentFetch,departmentUserFetch, setMount} = useDepartmentContext();
  const [teams, setTeams] = useState<Tables<"departments">[]>([]);

  useEffect(() => {
    if (departmentFetch.data) {
        setTeams(departmentFetch.data);
    }
  }, [departmentFetch.data]);

  const setQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url.toString());
  };

  const cardTeam = (name: string, id?: number) => {
    const classBtn = id == undefined ? "flex basis-2/6 justify-center w-full" : "hidden"

    return (
      <div
        className="flex flex-col items-center cursor-pointer bg-white rounded shadow flex-1 basis-1/4 h-28 max-w-56"
        onClick={() => 
          {if(id != undefined) {
            setQueryParam("department_id", String(id))
            departmentUserFetch.mutate(undefined, { revalidate: true });
            setMount(prev => !prev);
          }}}
        >
          <div className="basis-3/6 flex items-center bg-gray-100 w-full"></div>
          <p className="basis-1/6 mb-1 mt-2">{name}</p>
          <div className={classBtn}>
            <CreateDepartment/>
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

  return (
    <ScrollArea className="w-full rounded border bg-primary/10">
      <div className="flex flex-wrap gap-3 w-full max-h-64 pl-3 py-2">
          {departmentFetch.data == undefined ? 
              <div className="w-full flex items-center justify-center">
              <Button disabled className="h-24 w-56">
                  <Loader2 className="animate-spin" />
                  Please wait
              </Button>
              </div> : <RenderTeam/>
          }
      </div>
    </ScrollArea>
  )
}

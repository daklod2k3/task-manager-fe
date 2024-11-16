"use client";

import React, {useEffect} from "react";
import { useDepartmentContext } from "@/context/department-context";
import UserList from "@/components/department/UserList";
import SearchUser from "@/components/department/SearchUser";
import DeprtmentList from "@/components/department/DepartmentList";
import DepartmentDetail from "@/components/department/DepartmentDetail";

export default function Department() {
  const { setMount } = useDepartmentContext();
  useEffect(() => {
    console.log("mount client")
  }, [setMount]);

  return (
    <div className="flex p-4 flex-wrap">
      {/* Left column */}
      <h2 className="w-full font-semibold mb-6 text-primary text-2xl">People and teams</h2>
      <div className="flex-1 mr-4">
        <div>
          <div className="min-w-[300px] max-w-[300px]">
            <SearchUser onClickItem={() => {alert("show profile")}}/>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium mt-4 mb-2">People</h2>
          <UserList/>
        </div>
        <div>
          <h2 className="text-xl font-medium mt-4 mb-2">Teams</h2>
          <DeprtmentList/>
        </div>
      </div>

      {/*Right column*/}
      <DepartmentDetail/>
    </div>
  );
}
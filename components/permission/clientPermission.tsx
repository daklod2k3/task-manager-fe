"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams  } from "next/navigation";
import TablePermission from "@/components/permission/TablePermission";
import UserPermission from "@/components/permission/UserPermission";
import NavPermission from "@/components/permission/NavPermission";
import Resoucre from "@/components/permission/Resoucre";
import Loading from "../Loading";

export default function ClientPermission() {
  const searchParams = useSearchParams();
  const [cate, setCate] = useState<string>("loading");
  
  useEffect(() => {
    const cateFromUrl = searchParams.get("cate");
    setCate(cateFromUrl || "");
  }, [searchParams]);

  return (
    <div className="flex w-full h-screen">
      <NavPermission />
      {cate.toLowerCase() === "role" ? (
        <TablePermission />
      ) : cate.toLowerCase() === "resoucre" ? (
        <Resoucre />
      ) : cate.toLowerCase() === "user" ? (
        <UserPermission />
      ) : cate.toLowerCase() === "loading" ?(
        <Loading />
      ) : <TablePermission />}
    </div>
  );
}
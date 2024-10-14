"use client";
import { cn } from "@/lib/utils";
import {
  Bell,
  Building,
  CalendarDays,
  NotepadText,
  Home,
  MessageCircleMoreIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

export default function Navigation({}) {
  const path = usePathname();
  return (
    <div className="px-1 flex flex-col gap-3 py-5 items-center justify-start text-accent">
      <Image
        alt="logo"
        src={"/image/logo.png"}
        className=" object-fit drop-shadow mb-5"
        width={50}
        height={50}
      />
      <Button
        variant={path === "/" ? "secondary" : "ghost"}
        className={cn("flex flex-col w-full h-fit gap-1 font-bold")}
        asChild
      >
        <Link href={"/"}>
          <Home />
          Home
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/task") ? "secondary" : "ghost"}
        className="flex flex-col w-full h-fit gap-2 drop-shadow font-bold"
        asChild
      >
        <Link href={"/task"}>
          <CalendarDays />
          Task
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/department") ? "secondary" : "ghost"}
        className="flex flex-col w-full h-fit gap-2 drop-shadow font-bold p-1"
        asChild
      >
        <Link href={"/department"}>
          <Building />
          Department
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/channel") ? "secondary" : "ghost"}
        className="flex flex-col w-full h-fit gap-2 drop-shadow font-bold"
        asChild
      >
        <Link href={"/channel"}>
          <MessageCircleMoreIcon />
          Chat
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/activity") ? "secondary" : "ghost"}
        className="flex flex-col w-full h-fit gap-2 drop-shadow font-bold"
        asChild
      >
        <Link href={"/activity"}>
          <Bell />
          Activity
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/report") ? "secondary" : "ghost"}
        className="flex flex-col w-full h-fit gap-2 drop-shadow font-bold"
        asChild
      >
        <Link href={"/report"}>
          <NotepadText />
          Report
        </Link>
      </Button>
    </div>
  );
}

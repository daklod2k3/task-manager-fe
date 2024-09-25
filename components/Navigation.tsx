"use client";
import { cn } from "@/lib/utils";
import {
  Bell,
  Building,
  CalendarDays,
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
    <div className="px-3 flex flex-col gap-3 py-2 items-center justify-start text-primary *:text-xs">
      <Image
        alt="logo"
        src={"/image/logo-border.png"}
        className=" object-fit drop-shadow-lg mb-5"
        width={60}
        height={60}
      />
      <Button
        variant={path === "/" ? "secondary" : "ghost"}
        className={cn("flex flex-col aspect-square w-16 h-fit gap-1 font-bold")}
        asChild
      >
        <Link href={"/"}>
          <Home />
          Home
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/task") ? "secondary" : "ghost"}
        className="flex flex-col aspect-square w-16 h-fit gap-1 drop-shadow font-bold "
        asChild
      >
        <Link href={"/task"}>
          <CalendarDays />
          Task
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/department") ? "secondary" : "ghost"}
        className="flex flex-col aspect-square w-16 h-fit gap-1 drop-shadow font-bold "
        asChild
      >
        <Link href={"/department"}>
          <Building />
          Team
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/channel") ? "secondary" : "ghost"}
        className="flex flex-col w-16 h-fit gap-1 drop-shadow font-bold"
        asChild
      >
        <Link href={"/channel"}>
          <MessageCircleMoreIcon />
          Chat
        </Link>
      </Button>
      <Button
        variant={path.startsWith("/activity") ? "secondary" : "ghost"}
        className="flex flex-col w-16 h-fit gap-1 drop-shadow font-bold"
        asChild
      >
        <Link href={"/activity"}>
          <Bell />
          Activity
        </Link>
      </Button>
    </div>
  );
}

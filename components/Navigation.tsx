"use client";
import { cn } from "@/lib/utils";
import {
  Bell,
  Building,
  CalendarDays,
  Home,
  Icon,
  LucideIcon,
  MessageCircleMoreIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

interface INavButton extends React.ButtonHTMLAttributes<typeof Button> {
  current_path: string;
  base_path: string;
  title: string;
  Icon: LucideIcon;
}

const NavigationButton = ({
  current_path,
  base_path,
  title,
  Icon,
}: INavButton) => {
  const style = base_path === current_path ? "bg-primary/30" : "bg-transparent";

  return (
    <Button
      className={cn(
        "flex flex-col aspect-square w-16 h-fit gap-1 font-bold hover:bg-primary/30 shadow-none text-foreground",
        style
      )}
      asChild
    >
      <Link href={base_path}>
        <Icon />
        {title}
      </Link>
    </Button>
  );
};

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
      <NavigationButton
        Icon={Home}
        base_path="/"
        current_path={path}
        title="Home"
      />
      <NavigationButton
        Icon={CalendarDays}
        base_path="/task"
        current_path={path}
        title="Task"
      />
      <NavigationButton
        Icon={Building}
        base_path="/department"
        current_path={path}
        title="Team"
      />
      <NavigationButton
        base_path="/channel"
        current_path={path}
        Icon={MessageCircleMoreIcon}
        title="Chat"
      />
      <NavigationButton
        Icon={Bell}
        base_path="/activity"
        current_path={path}
        title="Activity"
      />
      {/* <Button
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
      </Button> */}
    </div>
  );
}

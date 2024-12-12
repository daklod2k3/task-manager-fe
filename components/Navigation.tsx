"use client";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import {
  Bell,
  Building,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  CreditCard,
  Home,
  Icon,
  Key,
  Keyboard,
  LifeBuoy,
  LogOut,
  LucideIcon,
  MessageCircleMoreIcon,
  NotepadText,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import MyAvatar from "./Avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
  className,
}: INavButton) => {
  const style = base_path === current_path ? "bg-primary/30" : "bg-transparent";

  return (
    <Button
      className={cn(
        "flex aspect-square h-fit w-16 flex-col gap-1 font-bold text-foreground shadow-none hover:bg-primary/30",
        style,
        className,
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

export function Navigation({}) {
  const path = usePathname();
  const { data: user } = useUser({ includes: "Role" });
  console.log(user);

  return (
    <div className="flex flex-col items-center justify-start gap-3 px-3 py-2 text-primary *:text-xs">
      <Image
        alt="logo"
        src={"/image/logo-border.png"}
        className="object-fit mb-5 drop-shadow-lg"
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
        Icon={ClipboardList}
        base_path="/task"
        current_path={path}
        title="Task"
      />
      <NavigationButton
        Icon={Building}
        base_path="/department"
        current_path={path}
        title="Teams"
      />
      <NavigationButton
        base_path="/chat"
        current_path={path}
        Icon={MessageCircleMoreIcon}
        title="Chat"
      />
      {/* <NavigationButton
        Icon={Bell}
        base_path="/activity"
        current_path={path}
        title="Activity"
      /> */}
      <NavigationButton
        Icon={NotepadText}
        base_path="/report"
        current_path={path}
        title="Report"
      />
      {user && user.role_name == "Admin" && (
        <NavigationButton
          Icon={Key}
          base_path="/permission"
          current_path={path}
          title="Admin"
        />
      )}
      <div className="mb-3 mt-auto">
        <ExpandableAvatar />
      </div>
    </div>
  );
}

export function ExpandableAvatar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { data: user } = useUser({});

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsExpanded(false), 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  console.log("isExpanded", isExpanded);

  return (
    // <div
    //   ref={avatarRef}
    //   // onMouseEnter={handleMouseEnter}
    //   // onMouseLeave={handleMouseLeave}
    // >
    <DropdownMenu>
      <DropdownMenuTrigger
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        className="relative flex items-center rounded-full p-1 transition-all duration-100 ease-out hover:bg-white"
      >
        {/* <button
            className={`flex items-center space-x-2 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
              isExpanded ? "pr-32" : "pr-0"
            }`}
            onClick={toggleExpand}
            aria-expanded={isExpanded}
            aria-haspopup="true"
          > */}
        <MyAvatar />
        <ChevronRight className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-white" />
        {/* </button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User /> Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            <span>Keyboard shortcuts</span>
            {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        {/* <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <Link href="/logout">
          <DropdownMenuItem>
            <LogOut />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
    // </div>
  );
}

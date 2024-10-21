"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Hash,
  Icon,
  LucideIcon,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface IChannelSelect extends IChannelButton {}

interface IChannelButton extends ButtonProps {
  active?: boolean;
  title?: string;
  Icon?: LucideIcon;
}

const ChannelButton = ({
  active = false,
  Icon,
  title,
  className,
  children,
  ...props
}: IChannelButton) => {
  const style = active
    ? ""
    : "bg-transparent text-foreground hover:bg-primary/30";
  if (Icon)
    return (
      <Button
        // variant={channel == baseChannel ? "default"}
        {...props}
        className={cn(
          "w-full justify-start mb-1 shadow-none ",
          style,
          className
        )}
      >
        <Icon className="h-4 w-4 mr-2" /> {title}
      </Button>
    );
  return (
    <Button
      // variant={channel == baseChannel ? "default"}
      {...props}
      className={cn("w-full mb-1 shadow-none justify-start", style, className)}
    >
      {children}
    </Button>
  );
};

const ChannelSelect = ({ ...props }: IChannelSelect) => {
  return <ChannelButton Icon={Hash} {...props} />;
};

const ChannelHeader = ({ title }: { title: string }) => {
  return (
    <h2 className="text-lg text-foreground font-semibold mb-2">{title}</h2>
  );
};

export default function ChannelList({
  className,
}: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  const [activeChat, setActiveChat] = useState<string | null>("general");
  // const [channel]

  const channels = [
    { id: "general", name: "General" },
    { id: "random", name: "Random" },
    { id: "work", name: "Work Stuff" },
  ];

  const directMessages = [
    {
      id: "alice",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "bob",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "charlie",
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  useEffect(() => {
    // setActiveChat()
  }, []);

  return (
    <div className={cn(className, "w-64 flex flex-col border-r")}>
      <ScrollArea className="flex-grow">
        <div className="p-4">
          {/* <h2 className="text-lg text-foreground font-semibold mb-2">
            Channels
          </h2> */}
          <ChannelHeader title="Channel" />
          {channels.map((channel) => (
            <ChannelSelect
              active={channel.id == activeChat}
              title={channel.name}
              key={channel.id}
              onClick={() => setActiveChat(channel.id)}
            />
          ))}
          <ChannelButton
            title="Add channel"
            Icon={Plus}
            className="bg-primary/20 shadow border border-primary w-fit"
          />
        </div>
        <div className="p-4">
          <ChannelHeader title="Direct Messages" />
          {directMessages.map((dm) => (
            <ChannelButton
              active={dm.id === activeChat}
              key={dm.id}
              onClick={() => setActiveChat(dm.id)}
            >
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={dm.avatar} alt={dm.name} />
                <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {dm.name}
            </ChannelButton>
          ))}
          <ChannelButton
            title="Add chat"
            Icon={Plus}
            className="bg-primary/20 shadow border border-primary w-fit"
          />
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Your Avatar"
            />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <span className="flex-grow text-left">Your Name</span>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Hash, Plus, Search, Settings, Users } from "lucide-react";
import { useState } from "react";

export default function ChannelList({
  className,
}: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  const [activeChat, setActiveChat] = useState<string | null>(null);

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

  return (
    <div className={cn(className, "w-64 flex flex-col border-r")}>
      <ScrollArea className="flex-grow">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Channels</h2>
          {channels.map((channel) => (
            <Button
              key={channel.id}
              variant="ghost"
              className={`w-full justify-start mb-1 ${
                activeChat === channel.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveChat(channel.id)}
            >
              <Hash className="h-4 w-4 mr-2" />
              {channel.name}
            </Button>
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Channel
          </Button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Direct Messages</h2>
          {directMessages.map((dm) => (
            <Button
              key={dm.id}
              variant="ghost"
              className={`w-full justify-start mb-1 ${
                activeChat === dm.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveChat(dm.id)}
            >
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={dm.avatar} alt={dm.name} />
                <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {dm.name}
            </Button>
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Direct Message
          </Button>
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

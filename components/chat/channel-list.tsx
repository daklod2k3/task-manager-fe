"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tables } from "@/entity/database.types";
import useChannel from "@/hooks/use-channel";
import useDirectMessage from "@/hooks/use-direct-message";
import { cn } from "@/lib/utils";
import {
  Building,
  Hash,
  Icon,
  LucideIcon,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MyAvatar from "../Avatar";
import Loading from "../Loading";
import SearchInput from "../SearchInput";

interface IChannelSelect extends IChannelButton {
  channel?: Tables<"channels">;
}

interface IChannelButton extends ButtonProps {
  active?: boolean;
  title?: string;
  Icon?: LucideIcon;
  link: string;
}

const ChannelButton = ({
  active = false,
  Icon,
  title,
  link,
  className,
  children,
  ...props
}: IChannelButton) => {
  const style = active
    ? ""
    : "bg-transparent text-foreground hover:bg-primary/30";
  return (
    <Link href={link}>
      <Button
        // variant={channel == baseChannel ? "default"}
        {...props}
        className={cn(
          "h-fit w-full justify-start py-1 shadow-none",
          style,
          className,
        )}
      >
        {Icon && <Icon className="mr-2 h-5 w-5" />}
        {children}
        {title}
      </Button>
    </Link>
  );
};

const ChannelSelect = ({ ...props }: IChannelSelect) => {
  return (
    <ChannelButton
      Icon={props.channel?.department_id ? Building : Hash}
      {...props}
    />
  );
};

const ChannelHeader = ({ title }: { title: string }) => {
  return <h2 className="mb-1 mt-3 font-semibold text-primary">{title}</h2>;
};

export default function ChannelList({
  className,
}: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  // const [channel]

  const { data, isLoading: channelLoading } = useChannel({});
  const channels = data as Tables<"channels">[];
  const { data: dmData, isLoading: dmLoading } = useDirectMessage({
    mode: "user",
  });
  const directMessages = dmData as Tables<"user_message">[];

  const pathname = usePathname();

  const form = useForm();

  useEffect(() => {
    // setActiveChat()
  }, []);

  return (
    <div className={cn(className, "flex w-64 flex-col p-4")}>
      <form>
        <SearchInput />
      </form>
      {dmLoading || channelLoading ? (
        <Loading />
      ) : (
        <ScrollArea className="mt-3 flex-grow">
          <div className="">
            {/* <h2 className="text-lg text-foreground font-semibold mb-2">
            Channels
          </h2> */}
            <ChannelHeader title="Channel" />
            {channels.map((channel) => (
              <ChannelSelect
                link={"/chat/channel/" + channel.id}
                active={pathname == "/chat/channel/" + channel.id}
                title={channel.name}
                key={channel.id}
                channel={channel}
              />
            ))}
            {/* <ChannelButton
            title="Add channel"
            Icon={Plus}
            className="h-8 w-fit border border-primary bg-primary/20 shadow"
          /> */}
          </div>
          <div className="">
            <ChannelHeader title="Direct Messages" />
            {directMessages &&
              directMessages.map((dm) => (
                <ChannelButton
                  link={"/chat/dm/" + dm.send_to.id}
                  key={dm.id}
                  className="flex flex-wrap items-center gap-2"
                  active={pathname == "/chat/dm/" + dm.send_to.id}
                >
                  <MyAvatar
                    className="border border-white"
                    size={6}
                    user={dm.send_to}
                  />
                  {dm.send_to?.name}
                </ChannelButton>
              ))}
            <ChannelButton
              link="#"
              title="Add chat"
              Icon={Plus}
              className="mt-2 h-8 w-fit border border-primary bg-primary/20 shadow"
            />
          </div>
        </ScrollArea>
      )}
      {/* <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start">
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Your Avatar"
            />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <span className="flex-grow text-left">Your Name</span>
          <Settings className="h-4 w-4" />
        </Button>
      </div> */}
    </div>
  );
}

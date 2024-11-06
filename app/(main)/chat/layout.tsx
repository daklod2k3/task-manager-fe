import ChannelList from "@/components/channel/Channel.List";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full flex-1">
      <ChannelList />
      <main className="h-full flex-1 flex-grow shadow-lg">{children}</main>
    </div>
  );
};

export default Layout;

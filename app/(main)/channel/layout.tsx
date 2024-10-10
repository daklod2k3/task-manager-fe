import ChannelList from "@/components/channel/Channel.List";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-1 h-full">
      <ChannelList />
      <main className="flex-1 flex-grow h-full shadow-lg bg-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;

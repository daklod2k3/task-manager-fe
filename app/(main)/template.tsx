import Header from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid h-screen max-h-screen grid-cols-[auto,1fr] overflow-hidden bg-gradient-to-br from-[#FFC4D9] via-[#FF81AA] to-[#FFC4D9]">
      <Navigation />
      <div className="grid min-h-0 min-w-0 grid-rows-[auto,1fr] pb-2 pr-2">
        <Header />
        <main className="min-h-0 overflow-hidden rounded-lg bg-white">
          {/* <main className="flex-1 flex-grow h-full">{children}</main> */}
          {children}
          {/* <div className="h-[10000px] bg-black w-3 min-h-0"/> */}
        </main>
      </div>
    </div>
  );
};

export default Layout;

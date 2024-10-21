import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen flex flex-row bg-gradient-to-br from-[#FFC4D9] via-[#FF81AA] to-[#FFC4D9]">
      <Navigation />
      <div className="flex flex-col flex-1 justify-center">
        <Header />
        <main className="flex-1 bg-white/80 overflow-hidden rounded-lg m-2 ml-0 mt-0">
          {/* <main className="flex-1 flex-grow h-full">{children}</main> */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

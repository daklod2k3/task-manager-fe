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
    <div className="h-screen flex flex-row bg-primary">
      <Navigation />
      <div className="flex flex-col flex-1 justify-center">
        <div className="flex flex-row justify-center">
          <div className="p-2 items-center flex relative">
            <Search className="h-4 w-4 ml-2 absolute" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-7 bg-accent"
            />
          </div>
        </div>
        <main className="flex-1 bg-white overflow-hidden rounded-lg m-2 ml-0 mt-0">
          {/* <main className="flex-1 flex-grow h-full">{children}</main> */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function PageHeader({ children }: Props) {
  return (
    <h1 className="mt-2 flex items-center gap-2 border-l-2 border-primary pl-2 text-lg font-bold">
      {children}
    </h1>
  );
}

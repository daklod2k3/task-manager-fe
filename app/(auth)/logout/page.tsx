"use client";
import { logout } from "@/action/Auth";
import Loading from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";

export default function Logout() {
  const { toast } = useToast();
  useEffect(() => {
    logout().then((res) => {
      if (res)
        toast({
          title: "Logout failed",
          description: res?.error || "An error occurred",
          variant: "destructive",
        });
    });
  }, []);
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="flex flex-col justify-center p-5">
        <Loading />
        Logging out...
      </Card>
    </div>
  );
}

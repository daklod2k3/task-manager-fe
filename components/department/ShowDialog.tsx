"use client";

import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ShowDialogProps {
  title: string;
  className?: string;
  triggerLabel: string;
  children: ReactNode;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ShowDialog: React.FC<ShowDialogProps> = ({ title,className,triggerLabel, children, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={className}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ShowDialog;
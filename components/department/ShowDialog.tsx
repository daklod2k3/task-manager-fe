"use client";

import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ShowDialogProps {
  title: string;
  triggerLabel: ReactNode;
  children: ReactNode;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ShowDialog: React.FC<ShowDialogProps> = ({ title,triggerLabel, children, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {triggerLabel}
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
"use client";

import { useState, useEffect, useRef } from "react";
import ButtonIcon from "@/components/department/ButtonIcon";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function AlertButton({ 
  openButtonLabel = "Show Dialog",
  btnIcon = "default",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  cancelLabel = "Cancel",
  actionLabel = "Continue",
  onAction,
}: {
  openButtonLabel?: string;
  btnIcon?: "trash" | "plus" | "default" ;
  title?: string;
  description?: string;
  cancelLabel?: string;
  actionLabel?: string;
  onAction?: (data?: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
     <ButtonIcon 
       nameIcon={btnIcon}
       onClick={openDialog}
       classNameBtn="w-full"
       label={openButtonLabel}
       />
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent ref={dialogRef}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction 
                  onClick={() => {
                  if (onAction) onAction(); 
                  closeDialog();
                  }}>
              {actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AlertButton;
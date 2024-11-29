'use client'

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertButtonProps {
  title: string;
  description?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const AlertButton: React.FC<AlertButtonProps> = ({
  title,
  description = "Are you sure you want to proceed?",
  confirmButtonLabel = "Confirm",
  cancelButtonLabel = "Cancel",
  onAction,
  isLoading = false,
  children,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">{cancelButtonLabel}</Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={onAction}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : confirmButtonLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertButton;
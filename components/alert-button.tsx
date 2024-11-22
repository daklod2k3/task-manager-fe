"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  children?: typeof AlertDialogTrigger;
  triggerLabel?: string;
  submitLabel?: string;
  cancelLabel?: string;
  title?: string;
  description?: string;
  onCancel?: () => Promise<any>;
  onSubmit?: () => Promise<any>;
}

export default function AlertButton({
  children,
  triggerLabel,
  submitLabel,
  cancelLabel,
  title,
  description,
  onCancel,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);
  const Trigger = children || AlertDialogTrigger;
  return (
    <AlertDialog>
      <Trigger>
        {triggerLabel || "Delete"}
        {loading && <Loader2 className="ml-1 h-4 w-4 animate-spin" />}
      </Trigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => typeof onCancel === "function" && onCancel()}
          >
            {cancelLabel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setLoading(true);
              typeof onSubmit === "function" &&
                onSubmit().then(() => setLoading(false));
              setLoading(false);
            }}
          >
            {submitLabel || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

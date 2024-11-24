import React from "react";
import { useForm } from "react-hook-form";
import DropFileInput from "../drop-file-input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";

export default function TaskComplete() {
  const form = useForm();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 font-semibold">Mark as Complete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
            <DropFileInput />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

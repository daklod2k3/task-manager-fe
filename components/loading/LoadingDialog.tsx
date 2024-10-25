"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import Loading from "../Loading";

interface Props {
  open: boolean;
}

export default function LoadingDialog({ open }: Props) {
  return (
    <Dialog open={open}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <Loading />
      </DialogContent>
    </Dialog>
  );
}

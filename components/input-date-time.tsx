"use client";

import { format, isValid, parse } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DateTimePicker({
  value,
  onChange,
}: {
  value: Date | undefined;
  onChange: (date: Date) => void;
}) {
  const date = value;
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isTimeInputOpen, setIsTimeInputOpen] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDateTime = date ? new Date(date) : new Date();
      newDateTime.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      onChange(newDateTime);
      setIsCalendarOpen(false);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = event.target.value;
    if (timeString) {
      const [hours, minutes] = timeString.split(":");
      const newDateTime = date ? new Date(date) : new Date();
      newDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      onChange(newDateTime);
    }
    setIsTimeInputOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const parsedDate = parse(inputValue, "PPP p", new Date());
    if (isValid(parsedDate)) {
      onChange(parsedDate);
    }
  };

  return (
    <Popover
      open={isCalendarOpen || isTimeInputOpen}
      onOpenChange={(value) => {
        setIsCalendarOpen(value);
        setIsTimeInputOpen(value);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
          onClick={() => setIsCalendarOpen(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP p") : <span>Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
        <div className="border-t p-3">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4" />
            <Input
              type="time"
              value={date ? format(date, "HH:mm") : ""}
              onChange={handleTimeChange}
              onFocus={() => setIsTimeInputOpen(true)}
              className="w-full"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

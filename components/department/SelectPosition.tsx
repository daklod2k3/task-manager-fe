import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import AlertButton from "@/components/department/AlertButton";

const SelectPosition = ({ user, HandleOwner }) => {
  const [selectedValue, setSelectedValue] = useState(user.owner_type);
  const [isSelectOpen, setIsSelectOpen] = useState(false); 

  const handleAction = (value) => {
    HandleOwner(user.id, value); 
    setSelectedValue(value);
    setIsSelectOpen(false);
  };

  return (
    <Select
      open={isSelectOpen}
      onOpenChange={(open) => setIsSelectOpen(open)}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={selectedValue} />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2 space-y-2">
          <AlertButton
            title="Change owner type to Member?"
            onAction={() => handleAction("member")}
          >
            <div className="cursor-pointer">Member</div>
          </AlertButton>
          <AlertButton
            title="Change owner type to Owner?"
            onAction={() => handleAction("owner")}
          >
            <div className="cursor-pointer">Owner</div>
          </AlertButton>
        </div>
      </SelectContent>
    </Select>
  );
};

export default SelectPosition;

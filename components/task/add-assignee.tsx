import { peopleToSearch, usePeople } from "@/hooks/use-people";
import React from "react";
import SearchSelect from "../search-select";

interface Props {
  task_id: number;
}

export default function AddAssignee({ task_id }: Props) {
  const { data: peoples, isLoading: peopleLoading } = usePeople();

  return (
    <SearchSelect
      disable
      isLoading={peopleLoading}
      placeholder="Add assignee"
      variant="people"
      modal={true}
      onSelectedValueChange={(x) => {
        console.log("click");
        // addAssignee(x);
      }}
      items={peopleToSearch(peoples || [])}
    />
  );
}

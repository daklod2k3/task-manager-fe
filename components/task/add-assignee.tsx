import { addTaskUser, deleteTaskUser } from "@/action/TaskUser";
import { TaskUsers } from "@/entity/Entity";
import { peopleToSearch, usePeople } from "@/hooks/use-people";
import { useTask } from "@/hooks/use-task";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import MyAvatar from "../Avatar";
import SearchSelect from "../search-select";
import { Badge } from "../ui/badge";

interface Props {
  task_id: number;
  task_user?: TaskUsers[];
}

export default function AddAssignee({ task_id, task_user }: Props) {
  const { data: peoples, isLoading: peopleLoading } = usePeople();
  const [select, setSelect] = useState(task_user || []);

  const { toast } = useToast();

  const add = async (user) => {
    if (select.filter((x) => x.user.id === user.id).length > 0) {
      toast({ title: "User already added", variant: "destructive" });
      return;
    }
    const res = await addTaskUser({
      task_id,
      user_id: user.id,
    });
    if (res?.error || !res) {
      toast({
        title: "Failed to add assignee",
        description: res?.error || "Server error",
        variant: "destructive",
      });
      return;
    }
    setSelect([...select, { ...res.data, user }]);
  };

  const remove = async (id) => {
    const res = await deleteTaskUser(id);
    if (res?.error || !res) {
      toast({
        title: "Failed to add assignee",
        description: res?.error || "Server error",
        variant: "destructive",
      });
      return;
    }
    setSelect(select.filter((x) => x.id !== id));
  };

  return (
    <div>
      <div className="mb-1 flex flex-wrap gap-1">
        {select?.map((x) => (
          <Badge key={x.id} className="flex gap-1 p-1">
            <MyAvatar user={x.user} size={7} />
            {x.user.name}
            <X
              size={18}
              className="cursor-pointer rounded-full hover:bg-white hover:text-primary"
              onClick={() => remove(x.id)}
            />
          </Badge>
        ))}
      </div>
      <SearchSelect
        isLoading={peopleLoading}
        placeholder="Add assignee"
        variant="people"
        modal={true}
        onSelectedValueChange={(x: any) => {
          // console.log("click");
          add(x);
        }}
        items={peopleToSearch(peoples || [])}
      />
    </div>
  );
}

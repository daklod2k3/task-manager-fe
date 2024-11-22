"use client";

import React, { useState, useEffect } from 'react';
import { usePeople } from "@/hooks/use-people";
import Avatar from "@/components/Avatar";
import Loading from '../Loading';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

export default function LoadPeople(
  { id,Owner, className="", showName = false, showAvt = false, showPosition = false, showDelete=false, showLoading=true } : 
  { id: string, onDetele?: (id?:number) => void, showDelete?:boolean, Owner?:string, className?:string, showName?: boolean, showAvt?: boolean, showPosition?: boolean,showLoading?: boolean}
) {
  const userFetch = usePeople();
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      if (userFetch.data) {
        const foundPerson = userFetch.data.find((p: any) => p.id === id);
        setPerson(foundPerson || null);
        setLoading(false); 
      }
    };
    fetchPerson();
  }, [userFetch.data, id]);

  if (loading && showLoading) return <Loading/>;
  if (loading && !showLoading) return;
  if (!person) return <div>Không tìm thấy người dùng</div>;

  return (
    <div className={className}>
      <div className="flex items-center justify-center">
        {showAvt && <Avatar user={person} />}
        {showName && <span className="ml-2 text-sm font-medium">{person.name}</span>}
      </div>
      <div className="flex items-center justify-center">
        {showPosition && 
        <Select>
          <SelectTrigger className="text-primary w-fit">
            <SelectValue placeholder={Owner} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Position</SelectLabel>
              <SelectItem value="apple">owner</SelectItem>
              <SelectItem value="banana">user</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        }
        {showDelete && <Button className="ml-2"><X/></Button>}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { usePeople } from "@/hooks/use-people";
import Avatar from "@/components/Avatar";
import Loading from '../Loading';

export default function LoadPeople(
  { id, className="", showName = false, showAvt = false, showPosition = false, showLoading=true } : 
  { id: string, className?:string, showName?: boolean, showAvt?: boolean, showPosition?: boolean,showLoading?: boolean}
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
      {showAvt && <Avatar user={person} />}
      {showName && <span className="ml-3 text-sm font-medium">{person.name}</span>}
      {showPosition && <span className="text-primary ml-auto">Member</span>}
    </div>
  );
}

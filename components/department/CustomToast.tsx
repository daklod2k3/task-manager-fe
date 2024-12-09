"use client"
import { CheckCircle2 } from 'lucide-react'
import { ReactNode } from 'react';

export function DescriptionCustom({ children }: { children: ReactNode }) {
    return (
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
        <span className="text-green-800 capitalize font-semibold">{children}</span>
      </div>
    );
  }

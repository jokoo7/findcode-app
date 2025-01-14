'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import { buttonVariants } from './ui/button'

interface IProps {
  className: string
}

export function NavLinks({ className }: IProps) {
  return (
    <div className={className}>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'ghost' }), 'text-neutral-700 dark:text-neutral-300')}
      >
        Starter Kit
        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3" />
      </Link>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'ghost' }), 'text-neutral-700 dark:text-neutral-300')}
      >
        UI Template
        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3" />
      </Link>
    </div>
  )
}

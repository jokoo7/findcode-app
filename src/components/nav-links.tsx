'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import * as React from 'react'

import { buttonVariants } from './ui/button'

interface IProps {
  className: string
}

export function NavLinks({ className }: IProps) {
  return (
    <div className={className}>
      <Link
        href="/products?category=starter-kit"
        className={cn(buttonVariants({ variant: 'ghost' }), 'text-neutral-700 dark:text-neutral-300')}
      >
        Starter Kit <span aria-hidden="true">&rarr;</span>
      </Link>
      <Link
        href="/products?category=ui-template"
        className={cn(buttonVariants({ variant: 'ghost' }), 'text-neutral-700 dark:text-neutral-300')}
      >
        UI Template
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  )
}

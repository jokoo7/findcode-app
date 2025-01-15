'use client'

import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES as productCategory } from '@/config'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface IProps {
  className: string
}

export function NavLinks({ className }: IProps) {
  return (
    <div className={className}>
      {productCategory.map(category => (
        <Link
          key={category.value}
          href={category.href}
          className={cn(buttonVariants({ variant: 'ghost' }), 'text-neutral-700 dark:text-neutral-300')}
        >
          {category.label} <span aria-hidden="true">&rarr;</span>
        </Link>
      ))}
    </div>
  )
}

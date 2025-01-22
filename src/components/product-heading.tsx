import Link from 'next/link'

import { findProductCategory } from '@/lib/utils'
import React from 'react'

interface IProps {
  id?: string
  label?: string
  subLabel?: string
  href?: string
}

function ProductHeading({ id, label, subLabel, href }: IProps) {
  let category: any
  if (id) {
    category = findProductCategory(id)
  }

  return (
    <div className="mb-4 md:flex md:items-center md:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold sm:text-3xl">{category?.name ? category.name : label}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {category?.description ? category.description : subLabel}
        </p>
      </div>

      {category?.href && (
        <Link
          href={category?.href ? category.href : href}
          className="hidden text-sm font-medium text-primary md:block"
        >
          Lihat selengkapnya <span aria-hidden="true">&rarr;</span>
        </Link>
      )}

      {href && (
        <Link
          href={category?.href ? category.href : href}
          className="hidden text-sm font-medium text-primary md:block"
        >
          Lihat selengkapnya <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  )
}

export default ProductHeading

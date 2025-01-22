import Link from 'next/link'

import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductReel from '@/components/product-reel'
import SearchProduct from '@/components/search-product'
import { buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES as productCategory } from '@/config'
import { findProductCategory } from '@/lib/utils'
import * as React from 'react'

type Param = string | string[] | undefined

interface IProps {
  searchParams: Promise<Record<string, Param>>
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

export default async function page({ searchParams }: IProps) {
  const category = parse((await searchParams).category)
  const query = parse((await searchParams).query)
  const label = findProductCategory(category)?.label

  return (
    <>
      <MaxWidthWrapper className="py-10">
        <div className="mb-10 max-w-xl">
          <SearchProduct />
        </div>

        {!query && (
          <div className="mb-6 space-x-4">
            <Link href="/products" className={buttonVariants({ variant: 'secondary' })}>
              All
            </Link>
            {productCategory.map(category => (
              <Link
                href={category.href}
                className={buttonVariants({ variant: 'secondary' })}
                key={category.value}
              >
                {category.label}
              </Link>
            ))}
          </div>
        )}

        {query && <h3 className="text-lg italic">Search &quot;{query}&quot;</h3>}

        <ProductReel
          custom={{
            label: label ? label : query ? undefined : 'Browse high quality assets'
          }}
          type="grid"
          products={[]}
        />
      </MaxWidthWrapper>
    </>
  )
}

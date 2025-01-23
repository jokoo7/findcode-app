import Link from 'next/link'

import FilterProduct from '@/components/filter-product'
import HydrationClient from '@/components/hydration-client'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductReel from '@/components/product-reel'
import SearchProduct from '@/components/search-product'
import { buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES as productCategory } from '@/constants/product-categories'
import { getDataConvertByFields } from '@/lib/data'
import { getQueryClient } from '@/lib/get-query-client'
import { cn, findProductCategory } from '@/lib/utils'
import { Product } from '@/types/product-type'
import * as React from 'react'

type Param = string | string[] | undefined

interface IProps {
  searchParams: Promise<Record<string, Param>>
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

export default async function page({ searchParams }: IProps) {
  const queryClient = getQueryClient()

  const category = parse((await searchParams).category)
  const query = parse((await searchParams).query)

  const { data: products } = await queryClient.fetchQuery({
    queryKey: [`products${category ? '-' + category : ''}${query ? '-' + query : ''}`],
    queryFn: () => getDataConvertByFields<Product>('products', { category, query })
  })

  return (
    <HydrationClient queryClient={queryClient}>
      <MaxWidthWrapper className="py-10">
        <div className="mb-8 flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="w-full max-w-xl">
            <SearchProduct />
          </div>
          <FilterProduct />
        </div>

        <div className="flex items-center gap-1">
          {query || category ? (
            <h3 className="mb-4 text-lg italic">
              {query && `Search "${query}" `}
              {category && (
                <span>
                  {query && '&'} Category &quot;{findProductCategory(category)?.name}&quot;
                </span>
              )}
            </h3>
          ) : null}
        </div>

        <React.Suspense fallback={<p>Loading...</p>}>
          <ProductReel type="grid" products={products ?? []} />
        </React.Suspense>
      </MaxWidthWrapper>
    </HydrationClient>
  )
}

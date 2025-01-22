import Link from 'next/link'

import HydrationClient from '@/components/hydration-client'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductReel from '@/components/product-reel'
import SearchProduct from '@/components/search-product'
import { buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES as productCategory } from '@/constants/product-categories'
import { getDataConvertByFields } from '@/lib/data'
import { getQueryClient } from '@/lib/get-query-client'
import { cn } from '@/lib/utils'
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
        <div className="mb-10 max-w-xl">
          <SearchProduct />
        </div>

        {!query && (
          <div className="mb-6 flex flex-wrap gap-4">
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: 'secondary' }), 'rounded-full')}
            >
              All
            </Link>
            {productCategory.map(category => (
              <Link
                href={category.href}
                className={cn(buttonVariants({ variant: 'secondary' }), 'rounded-full')}
                key={category.id}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {query && <h3 className="text-lg italic">Search &quot;{query}&quot;</h3>}

        <React.Suspense fallback={<p>Loading...</p>}>
          <ProductReel type="grid" products={products ?? []} />
        </React.Suspense>
      </MaxWidthWrapper>
    </HydrationClient>
  )
}

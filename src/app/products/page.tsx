import BreadcrumbRoute from '@/components/breadcrumb-route'
import FilterProduct from '@/components/filter-product'
import HydrationClient from '@/components/hydration-client'
import MainLayout from '@/components/layouts/main-layout'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import SearchProduct from '@/components/search-product'
import { getProductsFilters } from '@/lib/data'
import { getQueryClient } from '@/lib/get-query-client'
import { findProductCategory } from '@/lib/utils'
import * as React from 'react'

import Products from './products'

type Param = string | string[] | undefined

interface IProps {
  searchParams: Promise<Record<string, Param>>
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

export default async function Page({ searchParams }: IProps) {
  const queryClient = getQueryClient()
  const category = parse((await searchParams).category)
  const query = parse((await searchParams).query)

  const queryKey =
    !query && !category
      ? ['products']
      : query && category
        ? ['products', 'q=' + query, 'cat=' + category]
        : category
          ? ['products', 'cat=' + category]
          : ['products', 'q=' + query]

  queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => getProductsFilters({ query, category })
  })

  return (
    <MainLayout>
      <MaxWidthWrapper className="py-10">
        <div className="mb-6">
          <BreadcrumbRoute />
        </div>

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

        <HydrationClient queryClient={queryClient}>
          <Products query={query} category={category} />
        </HydrationClient>
      </MaxWidthWrapper>
    </MainLayout>
  )
}

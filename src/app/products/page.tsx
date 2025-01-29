import BreadcrumbRoute from '@/components/breadcrumb-route'
import FilterProduct from '@/components/filter-product'
import MainLayout from '@/components/layouts/main-layout'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductsListing from '@/components/product-listing'
import SearchProduct from '@/components/search-product'
import { findProductCategory } from '@/lib/utils'
import * as React from 'react'

type Param = string | string[] | undefined

interface IProps {
  searchParams: Promise<Record<string, Param>>
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

export default async function Page({ searchParams }: IProps) {
  const category = parse((await searchParams).category)
  const query = parse((await searchParams).query)

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

        <ProductsListing query={query} category={category} />
      </MaxWidthWrapper>
    </MainLayout>
  )
}

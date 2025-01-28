'use client'

import { notFound } from 'next/navigation'

import ProductReel from '@/components/product-reel'
import { getProductsFilters } from '@/lib/data'
import { useSuspenseQuery } from '@tanstack/react-query'

interface IProps {
  query?: string | undefined
  category?: string | undefined
}

const Products = ({ query, category }: IProps) => {
  const queryKey =
    !query && !category
      ? ['products']
      : query && category
        ? ['products', 'q=' + query, 'cat=' + category]
        : category
          ? ['products', 'cat=' + category]
          : ['products', 'q=' + query]

  const {
    data: { data: products, success }
  } = useSuspenseQuery({
    queryKey: queryKey,
    queryFn: () => getProductsFilters({ query, category })
  })

  if (!success) {
    return notFound()
  }

  if (!products || products.length === 0) {
    return <p className="mt-2 text-muted-foreground">Product tidak ada.</p>
  }

  return <ProductReel type="grid" products={products} />
}

export default Products

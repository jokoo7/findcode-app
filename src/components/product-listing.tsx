'use client'

// Sesuaikan dengan path yang benar
import { notFound } from 'next/navigation'

import { getProductsFilters } from '@/lib/data'
import { useQuery } from '@tanstack/react-query'

import ProductReel from './product-reel'
import ProductSkeleton from './skeleton/product-skeleton'

interface ProductsListingProps {
  query?: string
  category?: string
  type?: 'carausel' | 'grid'
}

const ProductsListing = ({ query, category, type = 'grid' }: ProductsListingProps) => {
  const queryKey = ['products', query && `q=${query}`, category && `cat=${category}`].filter(Boolean)

  const { data, isPending, isFetching, error } = useQuery({
    queryKey,
    queryFn: () => getProductsFilters({ query, category }),
    gcTime: query ? 0 : 5 * 60 * 1000
  })

  if (isPending || isFetching) {
    return <ProductSkeleton />
  }

  if (error || !data?.success) {
    return notFound()
  }

  const products = data?.data || []

  if (products.length === 0) {
    return <p className="mt-2 text-muted-foreground">Product tidak ada.</p>
  }

  return <ProductReel type={type} products={products} />
}

export default ProductsListing

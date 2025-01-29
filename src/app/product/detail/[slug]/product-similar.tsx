'use client'

import ProductReel from '@/components/product-reel'
import ProductSkeleton from '@/components/skeleton/product-skeleton'
import { getProductsByFields } from '@/lib/data'
import { Product } from '@/types/product-type'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'

export default function ProductSimilar({ product, slug }: { product: Product; slug?: string }) {
  const {
    data: products,
    isPending,
    isFetching
  } = useQuery({
    queryKey: ['products', 'similar=' + slug],
    queryFn: () => getProductsByFields({ field: 'category', value: product.category }),
    gcTime: 0
  })

  const productsSimilar = products?.data?.filter(p => p.id !== product.id)

  if (isPending || isFetching) {
    return <ProductSkeleton />
  }

  if (productsSimilar?.length === 0 || !productsSimilar) {
    return <p className="mt-2 text-muted-foreground">Product tidak ada.</p>
  }

  return <ProductReel type="carausel" isHref={false} className="mb-10" products={productsSimilar} />
}

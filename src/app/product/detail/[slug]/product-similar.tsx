'use client'

import ProductReel from '@/components/product-reel'
import { getProductsByFields } from '@/lib/data'
import { Product } from '@/types/product-type'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'

export default function ProductSimilar({ product, slug }: { product: Product; slug?: string }) {
  const { data } = useQuery({
    queryKey: ['products', 'similar=' + slug],
    queryFn: () => getProductsByFields({ field: 'category', value: product.category })
  })

  const productsSimilarFilter = data?.data?.filter(p => p.id !== product.id)

  if (productsSimilarFilter?.length === 0) {
    return <p className="mt-2 text-muted-foreground">Product tidak ada.</p>
  }

  return <ProductReel isHref={false} className="mb-10" products={productsSimilarFilter ?? []} />
}

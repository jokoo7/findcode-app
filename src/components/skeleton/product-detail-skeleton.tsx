import React from 'react'

import { Skeleton } from '../ui/skeleton'

const ProductDetailSkeleton = () => {
  return (
    <div className="mx-auto max-w-2xl py-8 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-16">
      {/* Product Details */}
      <div className="h-full space-y-4 lg:max-w-lg lg:self-start">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-[90%]" />
        <Skeleton className="h-12 w-[80%]" />
        <Skeleton className="h-12 w-[70%]" />
        <Skeleton className="h-12 w-[60%]" />
        <Skeleton className="h-10 w-[50%]" />
      </div>

      {/* Product images */}
      <div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-start">
        <div className="mt-6 w-full overflow-hidden rounded-lg lg:mt-0">
          <Skeleton className="aspect-[5/4] w-full rounded-lg" />
          <div className="mt-4 grid w-full grid-cols-3 gap-4">
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* add to cart part */}
      <div className="mt-8 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  )
}

export default ProductDetailSkeleton

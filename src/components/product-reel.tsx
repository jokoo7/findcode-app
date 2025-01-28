import Link from 'next/link'

import ProductCard from '@/components/product-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn, findProductCategory } from '@/lib/utils'
import { Product } from '@/types/product-type'
import * as React from 'react'

interface IsCustomLink {
  status: boolean
  isVisible: boolean
  url?: string
}

interface IProps {
  products: Product[]
  type?: 'carausel' | 'grid'
  className?: string
  isHref?: boolean
  isCustomLink?: IsCustomLink
}

const ProductReel = ({
  type = 'carausel',
  className,
  products,
  isHref = true,
  isCustomLink
}: IProps) => {
  const category = !isCustomLink?.status ? findProductCategory(products[0]?.category) : null
  const linkUrl = isCustomLink?.status
    ? isCustomLink.url
      ? isCustomLink.url
      : '/products'
    : `/products?category=${category?.id}`

  return (
    <div className={cn(className)}>
      <div className="relative">
        <div className="flex w-full items-center">
          {type === 'carausel' ? (
            <Carousel className="relative w-full">
              <CarouselContent>
                {products.map(product => (
                  <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
              <CarouselNext className="right-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
            </Carousel>
          ) : (
            <div className="grid w-full grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      {(!isCustomLink || isCustomLink.isVisible) && isHref && (
        <div className="mt-2 w-full md:hidden">
          <Link href={linkUrl} className="text-sm font-medium text-primary">
            Lihat selengkapnya <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProductReel

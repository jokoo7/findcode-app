import Link from 'next/link'

import ProductCard from '@/components/product-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { findProductCategory } from '@/lib/utils'
import { Product } from '@/types/product-type'
import * as React from 'react'

type Custom = {
  label?: string
  subLabel?: string
  href?: string
}

interface IProps {
  id?: string
  custom?: Custom
  products: Product[]
  type?: 'carausel' | 'grid'
}

const ProductReelCustom = ({
  custom,
  type,
  products
}: {
  custom: Custom
  type: string
  products: Product[]
}) => {
  return (
    <>
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold sm:text-3xl">{custom.label}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{custom.subLabel}</p>
        </div>

        {custom.href && (
          <Link href={custom.href} className="hidden text-sm font-medium text-primary md:block">
            Lihat selengkapnya <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="flex w-full items-center">
          {type === 'carausel' ? (
            <Carousel className="relative w-full">
              <CarouselContent>
                {products.map((product: Product) => (
                  <CarouselItem
                    key={product.id}
                    className="xs:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <ProductCard key={product.id} product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
              <CarouselNext className="right-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
            </Carousel>
          ) : (
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const ProductReel = ({ id, custom, type = 'carausel', products }: IProps) => {
  const category = findProductCategory(id)

  if (!products || products.length === 0) {
    return <p>Products tidak ada</p>
  }

  if (!id && custom) {
    return <ProductReelCustom custom={custom} type={type} products={products} />
  }

  return (
    <>
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold sm:text-3xl">{category?.label}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{category?.subLabel}</p>
        </div>

        {category?.href && (
          <Link href={category.href} className="hidden text-sm font-medium text-primary md:block">
            Lihat selengkapnya <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="flex w-full items-center">
          {type === 'carausel' ? (
            <Carousel className="relative w-full">
              <CarouselContent>
                {products.map((product: Product) => (
                  <CarouselItem
                    key={product.id}
                    className="xs:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <ProductCard key={product.id} product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
              <CarouselNext className="right-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
            </Carousel>
          ) : (
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductReel

import ProductCard from '@/components/product-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Product } from '@/types/product-type'
import * as React from 'react'

import CustomError from './custom-error'

interface IProps {
  products: Product[]
  type?: 'carausel' | 'grid'
  children?: React.ReactNode
}

const ProductReel = ({ type = 'carausel', products, children }: IProps) => {
  if (!products || products.length === 0) {
    return <CustomError message="Products tidak ada" />
  }

  return (
    <>
      {children}
      <div className="relative">
        <div className="flex w-full items-center">
          {type === 'carausel' ? (
            <Carousel className="relative w-full">
              <CarouselContent>
                {products.map((product: Product) => (
                  <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <ProductCard key={product.id} product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
              <CarouselNext className="right-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
            </Carousel>
          ) : (
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

import Link from 'next/link'

import ProductCard from '@/components/product-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import * as React from 'react'

interface IProps {
  title?: string
  subTitle?: string
  type?: 'carausel' | 'grid'
  more?: boolean
}

const ProductReel = ({ title, subTitle, type = 'carausel', more = true }: IProps) => {
  return (
    <>
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl lg:max-w-4xl">
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subTitle}</p>
        </div>

        {more && (
          <Link href="/" className="hidden text-sm font-medium text-primary md:block">
            Lihat selengkapnya <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="mt-6 flex w-full items-center">
          {type === 'carausel' ? (
            <Carousel className="relative w-full">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="xs:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <ProductCard key={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
              <CarouselNext className="right-2 top-[35%] h-12 w-12 bg-secondary disabled:hidden" />
            </Carousel>
          ) : (
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {Array.from({ length: 5 }).map((_, index) => (
                <ProductCard key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductReel

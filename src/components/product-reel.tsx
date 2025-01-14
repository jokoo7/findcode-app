import * as React from 'react'

import ProductCard from './product-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

const ProductReel = () => {
  return (
    <Carousel className="relative w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="xs:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <ProductCard key={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 top-[35%] h-14 w-14 bg-secondary disabled:hidden" />
      <CarouselNext className="right-2 top-[35%] h-14 w-14 bg-secondary disabled:hidden" />
    </Carousel>
  )
}

export default ProductReel

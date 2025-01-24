import Link from 'next/link'
import { notFound } from 'next/navigation'

import HydrationClient from '@/components/hydration-client'
import Image from '@/components/image'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductCard from '@/components/product-card'
import ProductHeading from '@/components/product-heading'
import ProductReel from '@/components/product-reel'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { getDataConvertByFields } from '@/lib/data'
import { getQueryClient } from '@/lib/get-query-client'
import { cn } from '@/lib/utils'
import { Product } from '@/types/product-type'
import { Check, Shield } from 'lucide-react'
import { Suspense } from 'react'

import DetailProduct from './detail-product'

interface PageProps {
  params: Promise<{ slug: string }>
}

const Page = async ({ params }: PageProps) => {
  const slug = (await params)?.slug
  const queryClient = getQueryClient()

  const { data } = await queryClient.fetchQuery({
    queryKey: [`product-${slug}`],
    queryFn: () => getDataConvertByFields<Product>('products', { field: 'slug', value: slug })
  })
  if (!data) return notFound()

  const product = data[0]

  const { data: productsSimilar } = await queryClient.fetchQuery({
    queryKey: [`product-${product.category}`],
    queryFn: () =>
      getDataConvertByFields<Product>('products', { field: 'category', value: product.category })
  })

  return (
    <HydrationClient queryClient={queryClient}>
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <Suspense fallback={<p>Loading...</p>}>
            <DetailProduct product={product ?? []} />
          </Suspense>

          {/* Product images */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="h-full w-full overflow-hidden rounded-lg border">
              <Carousel className="relative aspect-square w-full">
                <CarouselContent>
                  {product?.imagesUrls &&
                    product.imagesUrls.map(img => (
                      <CarouselItem className="h-full w-full" key={img.public_id}>
                        <Image
                          src={img.url}
                          alt="img"
                          width={500}
                          height={500}
                          className="aspect-square w-full rounded-lg object-cover object-center"
                        />
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 top-1/2 h-12 w-12 bg-secondary disabled:hidden" />
                <CarouselNext className="right-2 top-1/2 h-12 w-12 bg-secondary disabled:hidden" />
              </Carousel>
            </div>
          </div>

          {/* add to cart part */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div>
                <Link target="_blank" href={product.fileUrl!} className={cn(buttonVariants(), 'w-full')}>
                  Dapatkan source code
                </Link>
              </div>
              <div className="mt-6 text-center">
                <div className="text-medium group inline-flex text-sm">
                  <Shield aria-hidden="true" className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="text-muted-foreground hover:text-gray-700">
                    Jaminan Pengembalian 30 Hari
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductReel type="grid" products={productsSimilar ?? []}>
          <ProductHeading
            label="Brand New"
            subLabel="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          />
        </ProductReel>
      </MaxWidthWrapper>
    </HydrationClient>
  )
}

export default Page

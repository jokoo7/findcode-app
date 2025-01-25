import Link from 'next/link'
import { notFound } from 'next/navigation'

import HydrationClient from '@/components/hydration-client'
import Image from '@/components/image'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductHeading from '@/components/product-heading'
import ProductReel from '@/components/product-reel'
import { buttonVariants } from '@/components/ui/button'
import { getDataConvertByFields } from '@/lib/data'
import { getQueryClient } from '@/lib/get-query-client'
import { cn } from '@/lib/utils'
import { Product } from '@/types/product-type'
import { Shield } from 'lucide-react'
import { Suspense } from 'react'

import DetailProduct from './product-detail'
import ProductImage from './product-image'

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

  const productsSimilarFilter = productsSimilar?.filter(p => p.id !== product.id)

  return (
    <HydrationClient queryClient={queryClient}>
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl py-8 sm:px-6 sm:py-16 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <Suspense fallback={<p>Loading...</p>}>
            <DetailProduct product={product ?? []} />
          </Suspense>

          {/* Product images */}
          <ProductImage images={product.imagesUrls} />

          {/* add to cart part */}
          <div className="mt-8 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
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

        <ProductReel className="mb-10" products={productsSimilarFilter ?? []}>
          <ProductHeading
            label="Produk Serupa"
            subLabel="Temukan pilihan produk serupa yang berkualitas tinggi untuk kebutuhan Anda."
            href={`/products?category=${product.category}`}
          />
        </ProductReel>
      </MaxWidthWrapper>
    </HydrationClient>
  )
}

export default Page

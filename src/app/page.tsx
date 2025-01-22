import Link from 'next/link'

import HydrationClient from '@/components/hydration-client'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductReel from '@/components/product-reel'
import { Button, buttonVariants } from '@/components/ui/button'
import { getDataConvertByFields } from '@/lib/data'
import { getQueryClient } from '@/lib/get-query-client'
import { cn } from '@/lib/utils'
import { Product } from '@/types/product-type'

export default async function Home() {
  const queryClient = getQueryClient()

  const { data: products } = await queryClient.fetchQuery({
    queryKey: ['products'],
    queryFn: () => getDataConvertByFields<Product>('products', [{ field: 'isPublished', value: true }])
  })

  const productsCategoryStarterKit = products?.filter(product => product.category === 'starter-kits')
  const productsCategoryUiTemplates = products?.filter(product => product.category === 'ui-templates')

  return (
    <HydrationClient queryClient={queryClient}>
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h1 className="max-w-screen-md scroll-m-20 text-4xl font-extrabold capitalize tracking-tight sm:text-5xl lg:text-6xl">
            <span className="inline-block bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-600 dark:to-white">
              Dapatkan{' '}
            </span>
            <span className="bg-gradient-to-b from-violet-500 to-primary bg-clip-text text-center text-transparent dark:from-violet-600 dark:to-primary">
              source code terbaik
            </span>
            <span className="bg-gradient-to-t from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-600 dark:to-white">
              {' '}
              siap pakai untuk proyek Anda.
            </span>
          </h1>
          <p className="mt-4 max-w-screen-md scroll-m-20 font-sans tracking-tight text-muted-foreground sm:text-lg">
            Selamat datang di findcode, marketplace khusus untuk source code berkualitas tinggi. Semua
            kode telah diverifikasi dan siap membantu Anda mengembangkan proyek dengan cepat dan efisien.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className={cn('dark:text-foreground', buttonVariants({ variant: 'default' }))}
            >
              Temukan Produk
            </Link>
            <Button variant="ghost">Atau hubungi kami &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>

      <section className="pb-16">
        <MaxWidthWrapper>
          <ProductReel
            custom={{
              label: 'Brand New',
              subLabel:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit eos corporis reiciendis ducimus vitae architecto voluptates autem.'
            }}
            products={products ?? []}
          />

          <div className="mt-6 w-full md:hidden">
            <Link href="/" className="text-sm font-medium text-primary">
              Shop the collection <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="pb-16">
        <MaxWidthWrapper>
          <ProductReel id="starter_kit" products={productsCategoryStarterKit ?? []} />

          <div className="mt-6 w-full md:hidden">
            <Link href="/" className="text-sm font-medium text-primary">
              Shop the collection <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="pb-16">
        <MaxWidthWrapper>
          <ProductReel id="ui_template" products={productsCategoryUiTemplates ?? []} />

          <div className="mt-6 w-full md:hidden">
            <Link href="/" className="text-sm font-medium text-primary">
              Shop the collection <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </HydrationClient>
  )
}

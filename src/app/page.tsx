import Link from 'next/link'

import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductReel from '@/components/product-reel'
import { Button, buttonVariants } from '@/components/ui/button'
// import { PERKS as perks } from '@/constants/perks'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <>
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

      {/* <section className="mb-20">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {perks.map(perk => (
              <div key={perk.name} className="relative rounded-md dark:border-neutral-700">
                <div className="my-2 flex justify-start md:flex-shrink-0">
                  <div className="flex aspect-square h-12 items-center justify-center rounded-xl bg-secondary">
                    {<perk.Icon size={20} className="text-primary" />}
                  </div>
                </div>
                <div className="w-full">
                  <h3 className="mb-1 text-xl font-medium">{perk.name}</h3>
                  <p className="font-sans text-sm text-muted-foreground">{perk.description}</p>
                </div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_20%,#000_80%,transparent_100%)]"></div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section> */}

      <section className="pb-16">
        <MaxWidthWrapper>
          <ProductReel
            custom={{
              label: 'Brand New',
              subLabel:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit eos corporis reiciendis ducimus vitae architecto voluptates autem.'
            }}
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
          <ProductReel id="starter_kit" />

          <div className="mt-6 w-full md:hidden">
            <Link href="/" className="text-sm font-medium text-primary">
              Shop the collection <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="pb-16">
        <MaxWidthWrapper>
          <ProductReel id="ui_template" />

          <div className="mt-6 w-full md:hidden">
            <Link href="/" className="text-sm font-medium text-primary">
              Shop the collection <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

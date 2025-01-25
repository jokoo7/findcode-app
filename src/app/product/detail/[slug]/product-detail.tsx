'use client'

import Link from 'next/link'

import BreadcrumbRoute from '@/components/breadcrumb-route'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { calculateDiscount, findProductCategory, formatCurrencyID } from '@/lib/utils'
import { Product } from '@/types/product-type'
import { BookOpen, Eye, Tags } from 'lucide-react'
import { useState } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'

interface IProps {
  product: Product
}

export default function ProductDetail({ product }: IProps) {
  const [openDescription, setOpenDescription] = useState(false)
  const isDesktop = useIsMobile()
  const category = findProductCategory(product.category)
  const price = product.price
  const discountPrice = product.discountPrice
  const amountAfterDiskon = calculateDiscount(price, discountPrice)
  const formatPrice = formatCurrencyID(amountAfterDiskon)

  return (
    <div className="lg:max-w-lg lg:self-end">
      <BreadcrumbRoute />
      <div className="mt-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>
      </div>

      <section className="mt-4">
        <div className="flex items-center">
          {price === 0 ? (
            <Badge className="w-fit text-sm font-normal text-white">Free</Badge>
          ) : (
            <p className="font-medium">{formatPrice}</p>
          )}

          <div className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground">
            {category?.name}
          </div>
        </div>

        <div className="mt-4">
          <span className="mb-2 block text-sm font-medium">Deskripsi Produk</span>
          <div
            className="line-clamp-2 text-sm"
            dangerouslySetInnerHTML={{
              __html: product?.description?.replace(/\n/g, '<br>') ?? ''
            }}
          />
          {!isDesktop ? (
            <Dialog open={openDescription} onOpenChange={setOpenDescription}>
              <DialogTrigger asChild>
                <span className="block cursor-pointer text-sm text-primary underline">
                  Lihat selengkapnya
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                  <DialogTitle className="mb-4">Description</DialogTitle>
                  <DialogDescription asChild>
                    <ScrollArea className="h-[300px] w-full">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product?.description?.replace(/\n/g, '<br>') ?? ''
                        }}
                      />
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={openDescription} onOpenChange={setOpenDescription}>
              <DrawerTrigger asChild>
                <span className="block cursor-pointer text-sm text-primary underline">
                  Lihat selengkapnya
                </span>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle className="mb-4">Description</DrawerTitle>
                  <DrawerDescription asChild>
                    <ScrollArea className="h-[300px] w-full">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product?.description?.replace(/\n/g, '<br>') ?? ''
                        }}
                      />
                    </ScrollArea>
                  </DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          )}
        </div>

        <div className="mt-4 flex">
          <ol className="space-y-3 text-sm">
            <li className="flex items-center gap-1">
              <div className="flex w-[130px] items-center gap-1 font-medium">
                <Eye size={17} />
                Pratinjau
              </div>
              {product.demoUrl ? (
                <Link target="_blank" href={product.demoUrl} className="text-primary underline">
                  Klik disini
                </Link>
              ) : (
                <span>-</span>
              )}
            </li>
            <li className="flex items-center gap-1">
              <div className="flex w-[130px] items-center gap-1 font-medium">
                <BookOpen size={17} />
                Dokumentasi
              </div>
              {product.documentationUrl ? (
                <Link target="_blank" href={product.documentationUrl} className="text-primary underline">
                  Klik disini
                </Link>
              ) : (
                <span>-</span>
              )}
            </li>

            <li className="flex items-start gap-1">
              <div className="flex w-[130px] flex-shrink-0 items-center gap-1 font-medium">
                <Tags size={17} />
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((v, i) => (
                  <Badge
                    className="px-3 py-1 font-medium text-muted-foreground"
                    variant="outline"
                    key={i}
                  >
                    {v}
                  </Badge>
                ))}
              </div>
            </li>
          </ol>
        </div>
      </section>
    </div>
  )
}

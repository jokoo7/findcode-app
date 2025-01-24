'use client'

import Link from 'next/link'

import BreadcrumbRoute from '@/components/breadcrumb-route'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button, buttonVariants } from '@/components/ui/button'
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { calculateDiscount, cn, findProductCategory, formatCurrencyID } from '@/lib/utils'
import { Product } from '@/types/product-type'
import { Check } from 'lucide-react'
import React, { useState } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'

interface IProps {
  product: Product
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' }
]

export default function DetailProduct({ product }: IProps) {
  const [openDescription, setOpenDescription] = useState(false)
  const isDesktop = useIsMobile()
  const category = findProductCategory(product.category)
  const price = product.price
  const discountPrice = product.discountPrice
  const amountAfterDiskon = calculateDiscount(price, discountPrice)
  const formatPrice = formatCurrencyID(amountAfterDiskon)

  return (
    <div className="lg:max-w-lg lg:self-end">
      {/* <ol className="flex items-center space-x-2">
        {BREADCRUMBS.map((breadcrumb, i) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center text-sm">
              <Link href={breadcrumb.href} className="text-sm font-medium text-muted-foreground">
                {breadcrumb.name}
              </Link>
              {i !== BREADCRUMBS.length - 1 ? (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 flex-shrink-0"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              ) : null}
            </div>
          </li>
        ))}
      </ol> */}
      <BreadcrumbRoute />

      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>
      </div>

      <section className="mt-4">
        <div className="flex items-center">
          {price === 0 ? (
            <Badge className="w-fit font-sans text-sm font-normal text-white">Free</Badge>
          ) : (
            <p className="font-medium">{formatPrice}</p>
          )}

          <div className="ml-4 border-l border-gray-300 pl-4 text-muted-foreground">
            {category?.name}
          </div>
        </div>

        <div className="mt-4">
          <div
            className="line-clamp-4 text-sm"
            dangerouslySetInnerHTML={{
              __html: product?.description?.replace(/\n/g, '<br>') ?? ''
            }}
          />
          {!isDesktop ? (
            <Dialog open={openDescription} onOpenChange={setOpenDescription}>
              <DialogTrigger asChild>
                <span className="block cursor-pointer italic text-muted-foreground underline">
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
                <span className="block cursor-pointer italic text-muted-foreground underline">
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

        <div className="mt-6 flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="block text-sm">Preview: </span>
            <Link
              target="_blank"
              href={product.fileUrl!}
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              Live preview
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="block text-sm">Dokumentasi: </span>
            <Link
              target="_blank"
              href={product.fileUrl!}
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              Dokumentasi project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

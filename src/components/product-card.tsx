import Link from 'next/link'

import Image from '@/components/image'
import { PRODUCT_CATEGORIES } from '@/constants/product-categories'
import { calculateDiscount, cn, formatCurrencyID } from '@/lib/utils'
import { Product } from '@/types/product-type'
import React from 'react'

import { Badge } from './ui/badge'

interface IProps {
  product: Product
}

const ProductCard = ({ product }: IProps) => {
  const labelCategory = PRODUCT_CATEGORIES.filter(cat => product.category === cat.id)[0]
  const price = product.price
  const discountPrice = product.discountPrice
  const amountAfterDiskon = calculateDiscount(price, discountPrice)
  // Status produk
  const isFree = discountPrice === 0 && price === 0
  const hasDiscount = discountPrice !== 0

  // Gambar utama produk
  const mainImage = product.imagesUrls[0]

  return (
    <Link className={cn('group/main visible h-full w-full cursor-pointer')} href={`/`}>
      <div className="relative flex w-full flex-col">
        {isFree ? (
          <Badge className="absolute right-2 top-2 z-30 bg-green-500 font-sans text-sm font-normal text-white hover:bg-green-500/80 dark:bg-green-700 dark:hover:bg-green-700/80">
            Free
          </Badge>
        ) : (
          hasDiscount && (
            <Badge
              variant="destructive"
              className="absolute right-2 top-2 z-30 font-sans text-sm font-normal"
            >
              {discountPrice}% off
            </Badge>
          )
        )}

        <div className="aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={mainImage.url}
            alt={product.title}
            width={700}
            height={600}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <h3 className="mt-4 line-clamp-2 text-base font-medium">{product.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{labelCategory.name}</p>
        <div className="mt-1 flex gap-2">
          {hasDiscount && (
            <span className="block text-sm font-medium italic text-destructive line-through">
              {formatCurrencyID(price)}
            </span>
          )}
          {!isFree && (
            <span className="block text-sm font-medium">
              {formatCurrencyID(hasDiscount ? amountAfterDiskon : price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

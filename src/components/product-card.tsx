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
    <div className="group/main visible relative flex w-full flex-col font-sans">
      <Link href="/" className="aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={mainImage.url}
          alt={product.title}
          width={700}
          height={600}
          className="h-full w-full object-cover object-center"
        />
      </Link>

      <h3 className="mt-3 line-clamp-2 text-base font-medium">{product.title}</h3>
      <p className="mt-1 w-fit cursor-pointer text-sm text-muted-foreground hover:underline">
        {labelCategory.name}
      </p>
      <div className="mt-1 flex flex-col">
        {isFree ? (
          <Badge className="w-fit font-sans text-sm font-normal text-white">Free</Badge>
        ) : (
          hasDiscount && (
            <div className="flex items-center gap-2">
              <span className="inline-block text-sm font-medium text-destructive line-through">
                {formatCurrencyID(price)}
              </span>
              <Badge variant="secondary" className="font-sans text-xs font-normal">
                {discountPrice}% off
              </Badge>
            </div>
          )
        )}
        {!isFree && (
          <span className="block text-sm font-medium">
            {formatCurrencyID(hasDiscount ? amountAfterDiskon : price)}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductCard

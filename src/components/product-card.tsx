import Link from 'next/link'

import { cn } from '@/lib/utils'
import React from 'react'

import Image from './image'

const ProductCard = () => {
  return (
    <Link className={cn('group/main visible h-full w-full cursor-pointer')} href={`/`}>
      <div className="flex w-full flex-col">
        <div className="h-full w-full overflow-hidden rounded-xl">
          <Image
            src="https://cdn.dribbble.com/userupload/17255857/file/original-dd26efd537276b66bde7ba375a8971d8.png?format=webp&resize=450x338&vertical=center"
            alt="img"
            width={300}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>

        <h3 className="mt-4 text-base font-medium">Nextnime App</h3>
        <p className="mt-1 text-sm text-muted-foreground">Template</p>
        <p className="mt-1 text-sm font-medium">Rp. 20.000</p>
      </div>
    </Link>
  )
}

export default ProductCard

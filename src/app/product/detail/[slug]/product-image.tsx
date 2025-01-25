'use client'

import Image from '@/components/image'
import { cn } from '@/lib/utils'
import { ProductImages } from '@/types/product-type'
import { useState } from 'react'

interface IProps {
  images: ProductImages[]
}

export default function ProductImage({ images }: IProps) {
  const [img, setImg] = useState<string>(images[0].url)

  return (
    <div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
      <div className="mt-6 w-full overflow-hidden rounded-lg lg:mt-0">
        <div>
          <Image
            src={img}
            alt="img"
            width={1000}
            height={1000}
            className="aspect-[5/4] w-full rounded-lg border-2 object-cover object-center"
          />
        </div>
        <div className="mt-4 grid w-full grid-cols-3 gap-4">
          {images &&
            images.map(image => (
              <Image
                key={image.public_id}
                src={image.url}
                alt="img"
                width={1000}
                height={1000}
                onClick={() => setImg(image.url)}
                className={cn(
                  'aspect-video w-full cursor-pointer rounded-lg object-cover object-center',
                  {
                    'border-2 border-primary': image.url === img
                  }
                )}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'

import clsx from 'clsx'
import { useState } from 'react'

type ImageProps = {
  rounded?: string
} & NextImageProps

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, ...rest } = props
  const [loading, setLoading] = useState(true)

  return (
    <div className={clsx('h-full w-full overflow-hidden', loading ? 'animate-pulse' : '', rounded)}>
      <NextImage
        src={src}
        alt={alt}
        className={clsx(
          'duration-700 ease-in-out',
          loading ? 'scale-[1.02] blur-xl grayscale' : 'scale-100 blur-0 grayscale-0',
          rounded,
          className
        )}
        quality={100}
        loading="lazy"
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  )
}

export default Image

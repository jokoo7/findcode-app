import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductReel from '@/components/product-reel'
import * as React from 'react'

type Param = string | string[] | undefined

interface IProps {
  searchParams: Promise<Record<string, Param>>
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

export default async function page({ searchParams }: IProps) {
  const category = parse((await searchParams).category) ?? 'all'

  return (
    <>
      <MaxWidthWrapper className="py-10">
        <ProductReel
          title={category}
          subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit eos corporis reiciendis ducimus vitae architecto."
          more={false}
          type="grid"
        />
      </MaxWidthWrapper>
    </>
  )
}

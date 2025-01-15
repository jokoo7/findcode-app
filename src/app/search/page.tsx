import MaxWidthWrapper from '@/components/max-width-wrapper'
import SearchProduct from '@/components/search-product'
import * as React from 'react'

type Param = string | string[] | undefined

interface IProps {
  searchParams: Promise<Record<string, Param>>
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

export default async function page({ searchParams }: IProps) {
  const query = parse((await searchParams).query)

  return (
    <>
      <MaxWidthWrapper className="py-10">
        <div className="mx-auto mb-10 max-w-xl">
          <SearchProduct />
        </div>

        <div>search {query}</div>
      </MaxWidthWrapper>
    </>
  )
}

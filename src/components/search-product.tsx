'use client'

import Form from 'next/form'
import { useSearchParams } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import * as React from 'react'

const SearchProduct = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? null

  return (
    <Form action="/products" className="flex flex-col gap-2 sm:flex-row">
      <div className="relative w-full">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-200"
        />
        <Input
          name="query"
          type="search"
          defaultValue={query ? query : ''}
          className="indent-8 shadow-none"
          placeholder="Search product ..."
          required
        />
      </div>
    </Form>
  )
}

export default SearchProduct

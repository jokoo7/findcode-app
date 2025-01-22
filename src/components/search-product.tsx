import Form from 'next/form'

// import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import * as React from 'react'

const SearchProduct = () => {
  return (
    <Form action="/products" className="flex flex-col gap-2 sm:flex-row">
      <div className="relative w-full">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-200"
        />
        <Input name="query" className="indent-8" placeholder="Search product ..." required />
      </div>
      <Button type="submit">Search</Button>
    </Form>
  )
}

export default SearchProduct

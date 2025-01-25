'use client'

import Form from 'next/form'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

const SearchProduct = () => {
  const router = useRouter()

  return (
    <Form
      action={(formData: FormData) => {
        const query = formData.get('query') as string
        if (!query || query.trim() === '') return
        router.push(`/products?query=${encodeURIComponent(query)}`)
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <div className="relative w-full">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-200"
        />
        <Input
          name="query"
          type="search"
          className="indent-8 shadow-none"
          placeholder="Cari produk ..."
          required
        />
      </div>
    </Form>
  )
}

export default SearchProduct

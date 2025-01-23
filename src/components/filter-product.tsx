'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PRODUCT_CATEGORIES } from '@/constants/product-categories'
import { findProductCategory } from '@/lib/utils'
import { ListFilter } from 'lucide-react'
import * as React from 'react'

import { useIsMobile } from '@/hooks/use-mobile'

export default function FilterProduct() {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState(false)
  const category = findProductCategory(searchParams.get('category') ?? '')

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Filters</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start font-sans shadow-none">
            {category ? (
              <>
                <ListFilter />
                <span className="inline-block truncate">{category.name}</span>
              </>
            ) : (
              <>
                <ListFilter />
                <span className="inline-block">All</span>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side={isMobile ? 'bottom' : 'left'} align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <Link href={'/products'}>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                    }}
                  >
                    All
                  </CommandItem>
                </Link>
                {PRODUCT_CATEGORIES.map(cat => (
                  <Link key={cat.id} href={pathname + '?' + createQueryString('category', cat.id)}>
                    <CommandItem
                      value={cat.id}
                      onSelect={id => {
                        setOpen(false)
                      }}
                    >
                      {cat.name}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

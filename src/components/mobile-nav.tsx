'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PRODUCT_CATEGORIES } from '@/constants/product-categories'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  // const closeOnCurrent = (href: string) => {
  //   if (pathname === href) {
  //     setIsOpen(false)
  //   }
  // }

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 md:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    )

  return (
    <div>
      <div className="fixed inset-0 z-50 flex overflow-y-scroll overscroll-y-none">
        <div className="w-full">
          <div className="relative flex h-full w-full flex-col overflow-y-auto bg-background pb-12 shadow-xl">
            <div className="flex justify-end px-6 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 flex flex-col px-8">
              <Link
                href="/products"
                className="flex flex-1 items-center justify-between py-4 text-left text-sm font-medium"
              >
                Products
              </Link>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="hover:no-underline">Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4">
                      {PRODUCT_CATEGORIES.map(cat => (
                        <div key={cat.id} className="cursor-pointer">
                          <a
                            href={cat.href}
                            className={cn(
                              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                            )}
                          >
                            <div className="text-sm font-medium leading-none">{cat.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {cat.description}
                            </p>
                          </a>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav

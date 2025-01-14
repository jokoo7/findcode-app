'use client'

import { usePathname } from 'next/navigation'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { NavLinks } from './nav-links'

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

            <NavLinks className="mt-2 flex h-full flex-col justify-center gap-4 px-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav

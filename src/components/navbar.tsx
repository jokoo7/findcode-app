import Link from 'next/link'

import MaxWidthWrapper from '@/components/max-width-wrapper'
import { ModeToggle } from '@/components/mode-toggle'

import { NavLinks } from './nav-links'

const Navbar = async () => {
  return (
    <div className="sticky inset-x-0 top-0 z-50">
      <header className="relative w-full border-b bg-background">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center">
            <Link
              href="/"
              className="block bg-gradient-to-l from-violet-500 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent dark:from-violet-500 dark:to-primary"
            >
              findcode
            </Link>

            <div className="z-50 hidden sm:ml-8 sm:flex sm:items-center sm:self-stretch">
              <NavLinks />
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end sm:space-x-6">
                <div className="ml-4 flow-root sm:ml-6">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar

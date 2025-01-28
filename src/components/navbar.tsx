import Link from 'next/link'

import Logo from '@/components/logo'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import MobileNav from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
import NavLinks from '@/components/nav-links'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TbCoffee } from 'react-icons/tb'

const Navbar = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-50">
      <header className="relative w-full border-b bg-background">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center">
            {/* Logo */}
            <Logo />

            {/* Navigation Links (hidden on mobile) */}
            <div className="z-50 mt-1 hidden text-neutral-700 dark:text-neutral-300 md:ml-8 md:flex md:items-center md:self-stretch">
              <NavLinks />
            </div>
            {/* className="z-50 mt-1 hidden md:ml-8 md:flex md:items-center md:self-stretch" */}
            {/* Right Side */}
            <div className="ml-auto flex items-center">
              <div className="mr-4 flex items-center gap-2 md:mr-0 md:gap-4">
                {/* Coffee Button (Desktop) */}
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'hidden sm:flex [&_svg]:size-[1.2rem]'
                  )}
                >
                  <TbCoffee size={20} strokeWidth={1.5} />
                  <span className="mt-0.5 text-sm">Traktir Kopi</span>
                </Link>

                {/* Coffee Button (Mobile) */}
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'rounded-full sm:hidden [&_svg]:size-[1.2rem]'
                  )}
                >
                  <TbCoffee size={20} strokeWidth={1.5} />
                </Link>

                {/* Mode Toggle */}
                <ModeToggle />
              </div>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar

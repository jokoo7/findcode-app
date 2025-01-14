import Logo from '@/components/logo'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import MobileNav from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { NavLinks } from '@/components/nav-links'

const Navbar = async () => {
  return (
    <div className="sticky inset-x-0 top-0 z-50">
      <header className="relative w-full border-b bg-background">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center">
            <Logo />

            <NavLinks className="z-50 hidden sm:ml-8 sm:flex sm:items-center sm:self-stretch" />

            <div className="ml-auto flex items-center">
              <div className="mr-4 sm:mr-0 sm:flex sm:flex-1 sm:items-center sm:justify-end sm:space-x-6">
                <div className="ml-4 flow-root sm:ml-6">
                  <ModeToggle />
                </div>
              </div>
            </div>

            <MobileNav />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar

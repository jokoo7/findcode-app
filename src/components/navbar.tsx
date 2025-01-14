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

            <NavLinks className="z-50 mt-1 hidden md:ml-8 md:flex md:items-center md:self-stretch" />

            <div className="ml-auto flex items-center">
              <div className="mr-4 md:mr-0 md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
                <div className="ml-4 flow-root md:ml-6">
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

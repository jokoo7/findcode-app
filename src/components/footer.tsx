'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { PiInstagramLogoDuotone, PiTiktokLogoFill } from 'react-icons/pi'

import Logo from './logo'
import MaxWidthWrapper from './max-width-wrapper'
import { buttonVariants } from './ui/button'

const Footer = () => {
  const pathname = usePathname()
  const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in']

  return (
    <footer className="flex-grow-0">
      <MaxWidthWrapper>
        <div className="border-t">
          {pathsToMinimize.includes(pathname) ? null : (
            <div className="py-8">
              <div className="flex justify-center">
                <Logo />
              </div>
            </div>
          )}

          {pathsToMinimize.includes(pathname) ? null : (
            <div className="relative flex flex-col justify-between gap-6 px-6 py-6 sm:py-8 md:flex-row lg:mt-0">
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-secondary bg-opacity-90 bg-gradient-to-br"
                />
              </div>

              <div className="relative max-w-lg">
                <h3 className="text-lg font-semibold">Layanan Kami</h3>
                <p className="mt-1 font-sans text-sm text-accent-foreground">
                  Jika Anda ingin membuat produk digital yang disesuaikan dengan kebutuhan spesifik Anda,
                  jangan ragu untuk menghubungi kami.
                </p>
              </div>

              <div className="relative flex flex-col font-sans">
                <h3 className="mb-1 font-inter text-lg font-semibold">Hubungi kami</h3>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 justify-start px-0 font-normal text-accent-foreground'
                  )}
                >
                  <MdEmail size={18} />
                  joko74479@gmail.com
                </Link>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 justify-start px-0 font-normal text-accent-foreground'
                  )}
                >
                  <PiTiktokLogoFill size={18} />
                  @jokosannn_
                </Link>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 justify-start px-0 font-normal text-accent-foreground'
                  )}
                >
                  <PiInstagramLogoDuotone size={18} />
                  @jokosannn
                </Link>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 justify-start px-0 font-normal text-accent-foreground'
                  )}
                >
                  <FaWhatsapp size={18} />
                  082299841605
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              {/* &copy; {new Date().getFullYear()} - Joko Santoso All Rights Reserved */}
              &copy; {new Date().getFullYear()} findcode - Built with ❤️ by Joko Santoso
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex items-center justify-center gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer

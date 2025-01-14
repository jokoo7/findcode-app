'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import MaxWidthWrapper from '@/components/max-width-wrapper'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { PiInstagramLogoDuotone, PiTiktokLogoFill } from 'react-icons/pi'

const Footer = () => {
  const pathname = usePathname()
  const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in']

  return (
    <footer className="flex-grow-0">
      <MaxWidthWrapper>
        <div className="border-t py-10">
          {pathsToMinimize.includes(pathname) ? null : (
            <div className="relative flex flex-col justify-between gap-6 md:flex-row">
              <div className="relative max-w-lg">
                <h3 className="text-xl font-semibold">Layanan Kami</h3>
                <p className="mt-1 font-sans text-sm text-accent-foreground">
                  Jika Anda ingin membuat produk digital yang disesuaikan dengan kebutuhan spesifik Anda,
                  jangan ragu untuk menghubungi kami.
                </p>
              </div>

              <div className="relative flex flex-col font-sans">
                <h3 className="mb-1 font-inter text-xl font-semibold">Hubungi kami</h3>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'h-7 w-fit justify-start px-0 font-normal text-accent-foreground'
                  )}
                >
                  <MdEmail size={18} />
                  joko74479@gmail.com
                </Link>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'h-7 w-fit justify-start px-0 font-normal text-accent-foreground'
                  )}
                >
                  <PiTiktokLogoFill size={18} />
                  @jokosannn_
                </Link>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'h-7 w-fit justify-start px-0 font-normal text-accent-foreground'
                  )}
                >
                  <PiInstagramLogoDuotone size={18} />
                  @jokosannn
                </Link>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'h-7 w-fit justify-start px-0 font-normal text-accent-foreground'
                  )}
                >
                  <FaWhatsapp size={18} />
                  082299841605
                </Link>
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
      <div className="bg-secondary">
        <div className="mx-auto max-w-screen-xl px-6 py-4 md:flex md:items-center md:justify-between md:px-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Build with love by{' '}
              <span className="inline-block underline underline-offset-2">findcode.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

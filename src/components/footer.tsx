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
  const isPathMinimize = ['/login', '/admin'].some(path => pathname.startsWith(path))

  if (isPathMinimize) return null

  return (
    <footer className="flex-grow-0">
      <MaxWidthWrapper>
        <div className="border-t py-10">
          <div className="relative flex flex-col justify-between gap-10 md:flex-row">
            <div className="relative max-w-lg">
              <h3 className="text-xl font-semibold">Layanan Kami</h3>
              <p className="mt-1 text-base text-accent-foreground">
                Jika Anda ingin membuat produk digital yang disesuaikan dengan kebutuhan spesifik Anda,
                jangan ragu untuk menghubungi kami.
              </p>
            </div>

            <div className="relative flex flex-col">
              <h3 className="mb-1 text-xl font-semibold">Kontak Kami</h3>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'h-7 w-fit justify-start px-0 font-normal text-accent-foreground'
                )}
              >
                <MdEmail size={18} />
                sannbusiness16@gmail.com
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

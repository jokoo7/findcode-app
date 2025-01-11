import Link from 'next/link'

import MaxWidthWrapper from '@/components/max-width-wrapper'
import { ModeToggle } from '@/components/mode-toggle'
import { Button, buttonVariants } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <ModeToggle />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Your marketplace for high-quality <span className="text-primary">digital assets</span>.
          </h1>
          <p className="mt-4 max-w-prose scroll-m-20 tracking-tight text-muted-foreground sm:text-xl">
            Welcome to DigitalHippo. Every asset on our platform is verified by our team to ensure our
            highest quality standards.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/" className={buttonVariants({ variant: 'default' })}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface IProps {
  className?: string
  children: ReactNode
}

export default function MaxWidthWrapper({ className, children }: IProps) {
  return <div className={cn('mx-auto w-full max-w-screen-lg px-6 md:px-8', className)}>{children}</div>
}

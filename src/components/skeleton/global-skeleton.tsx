import { cn } from '@/lib/utils'
import React from 'react'

interface IProps {
  className?: string
}

function GlobalSkeleton({ className }: IProps) {
  return (
    <div className={cn('flex h-screen w-full items-center justify-center', className)}>
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200"></div>
        <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blue-500"></div>
      </div>
    </div>
  )
}

export default GlobalSkeleton

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface IProps {
  queryClient: any
  children: ReactNode
}

export default function HydrationClient({ queryClient, children }: IProps) {
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

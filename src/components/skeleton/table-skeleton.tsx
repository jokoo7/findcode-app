import React from 'react'

import { Skeleton } from '../ui/skeleton'

const TableSkeleton = () => {
  return (
    <div className="space-y-2 py-4">
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

export default TableSkeleton

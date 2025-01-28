import { Skeleton } from '@/components/ui/skeleton'

const ProductSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="space-y-2">
        <Skeleton className="aspect-square w-full rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-[80%] rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-[60%] rounded-xl"></Skeleton>
      </div>
      <div className="space-y-2">
        <Skeleton className="aspect-square w-full rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-[80%] rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-[60%] rounded-xl"></Skeleton>
      </div>
      <div className="space-y-2">
        <Skeleton className="aspect-square w-full rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-[80%] rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-[60%] rounded-xl"></Skeleton>
      </div>
      <div className="space-y-2">
        <Skeleton className="aspect-square w-full rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-[80%] rounded-xl"></Skeleton>
        <Skeleton className="h-4 w-[60%] rounded-xl"></Skeleton>
      </div>
    </div>
  )
}

export default ProductSkeleton

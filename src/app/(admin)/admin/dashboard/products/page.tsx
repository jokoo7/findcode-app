import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { getDataConvert } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Product } from '@/types/product-type'

import { columns } from './colums'
import { DataTable } from './data-table'

export default async function Page() {
  const { data: products } = await getDataConvert<Product>('products')

  return (
    <>
      <Link href="/admin/dashboard/products/new" className={cn(buttonVariants({ variant: 'outline' }))}>
        Create New Product
      </Link>
      <DataTable columns={columns} data={products ?? []} />
    </>
  )
}

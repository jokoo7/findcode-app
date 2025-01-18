import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { retriveData } from '@/services/firebase.service'

import { columns } from './colums'
import { DataTable } from './data-table'

export default async function Page() {
  const products: any = await retriveData('products')
  return (
    <>
      <Link
        href="/admin/dashboard/products/new"
        className={cn(buttonVariants({ variant: 'outline' }), 'mb-4')}
      >
        Create New Product
      </Link>
      <DataTable columns={columns} data={products} />
    </>
  )
}

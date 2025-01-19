import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { convertFirestoreData, retriveData } from '@/services/firebase.service'

import { columns } from './colums'
import { DataTable } from './data-table'

export default async function Page() {
  const fetchedData = await retriveData('products')
  const products = fetchedData.map(convertFirestoreData)

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

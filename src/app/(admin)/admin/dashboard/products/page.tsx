import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { columns } from './colums'
import { DataTable } from './data-table'

export default async function Page() {
  return (
    <>
      <Link
        href="/admin/dashboard/products/new"
        className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}
      >
        Create New Product
      </Link>
      <DataTable columns={columns} />
    </>
  )
}

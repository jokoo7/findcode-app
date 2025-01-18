import Link from 'next/link'

import { retriveData } from '@/services/firebase.service'
import { Product } from '@/types/product'

export default async function Page() {
  const products: any = await retriveData('products')
  return (
    <>
      <Link href="/admin/dashboard/products/new">create product</Link>
      <div className="mt-4 flex flex-col gap-2">
        {products.map((product: Product) => (
          <Link key={product.id} href={`/admin/dashboard/products/edit/${product.id}`}>
            {product.title}
          </Link>
        ))}
      </div>
    </>
  )
}

import ProductFormLayout from '@/components/layouts/product-form-layout'
import { getDataConvertById } from '@/lib/data'
import { Product } from '@/types/product-type'
import { Suspense } from 'react'

interface IProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: IProps) {
  const id = (await params)?.id
  const { data: product } = await getDataConvertById<Product>('products', id)

  if (!id) {
    return <p>ID Tidak ada.</p>
  }

  if (!product) {
    return <p>Products tidak ada.</p>
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductFormLayout id={id} product={product}>
        <h1 className="mb-4 text-2xl font-medium">Edit Product ({product.title})</h1>
      </ProductFormLayout>
    </Suspense>
  )
}

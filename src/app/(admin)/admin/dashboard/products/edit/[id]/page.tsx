import ProductFormLayout from '@/components/layouts/product-form-layout'
import { retriveDataById } from '@/services/firebase.service'
import { Product } from '@/types/product'

interface IProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: IProps) {
  const id = (await params)?.id
  const product: any = await retriveDataById('products', id)

  return (
    <ProductFormLayout id={id} product={product}>
      <h1 className="mb-4 text-2xl font-medium">Edit Product</h1>
    </ProductFormLayout>
  )
}

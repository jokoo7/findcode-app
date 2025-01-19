import ProductFormLayout from '@/components/layouts/product-form-layout'
import { convertFirestoreData, retriveDataById } from '@/services/firebase.service'

interface IProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: IProps) {
  const id = (await params)?.id
  const fetchedData = await retriveDataById('products', id)
  const product = convertFirestoreData(fetchedData)

  if (!id) {
    return <p>ID Tidak ada.</p>
  }

  return (
    <ProductFormLayout id={id} product={product}>
      <h1 className="mb-4 text-2xl font-medium">Edit Product</h1>
    </ProductFormLayout>
  )
}

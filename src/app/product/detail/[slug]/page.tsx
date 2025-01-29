import MainLayout from '@/components/layouts/main-layout'
import MaxWidthWrapper from '@/components/max-width-wrapper'

import ProductDetail from './product-detail'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const slug = (await params)?.slug

  return (
    <MainLayout>
      <MaxWidthWrapper>
        <ProductDetail slug={slug} />
      </MaxWidthWrapper>
    </MainLayout>
  )
}

import HydrationClient from '@/components/hydration-client'
import MainLayout from '@/components/layouts/main-layout'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { getProductDetail } from '@/lib/data'
import { getQueryClient } from '@/lib/get-query-client'

import ProductDetail from './product-detail'

interface PageProps {
  params: Promise<{ slug: string }>
}

const Page = async ({ params }: PageProps) => {
  const slug = (await params)?.slug
  const queryClient = getQueryClient()

  queryClient.prefetchQuery({
    queryKey: ['products', 'detail=' + slug],
    queryFn: () => getProductDetail(slug)
  })

  return (
    <MainLayout>
      <MaxWidthWrapper>
        <HydrationClient queryClient={queryClient}>
          <ProductDetail slug={slug} />
        </HydrationClient>
      </MaxWidthWrapper>
    </MainLayout>
  )
}

export default Page

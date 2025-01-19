export type Product = {
  id: string
  title: string
  slug: string
  description?: string | undefined | null
  techStacks: string[]
  price: number
  discountPrice: number
  sold: number
  imagesUrls: ProductImages[]
  demoUrl?: string | undefined | null
  documentationUrl?: string | undefined | null
  category: string
  fileUrl?: string | undefined | null
  isPublished: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type ProductImages = {
  url: string
  public_id: string
}

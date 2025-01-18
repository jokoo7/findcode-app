export type Product = {
  id: string
  title: string
  slug: string
  description: string
  tech_stacks: string[]
  price: number
  diskon: number
  sold: number
  images: ProductImages[]
}

export type ProductImages = {
  url: string
  public_id: string
}

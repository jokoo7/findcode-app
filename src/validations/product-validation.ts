import { z } from 'zod'

export const formSchema = z
  .object({
    title: z.string().min(1, 'Judul diperlukan'),
    description: z.string().min(1, 'Deskripsi diperlukan').optional(),
    slug: z.string().min(1, 'Slug diperlukan'),
    category: z.string(),
    price: z
      .number()
      .min(0, 'Harga harus berupa angka yang valid dan lebih besar dari atau sama dengan 0'),
    discountPrice: z
      .number()
      .min(0, 'Harga Diskon harus berupa angka yang valid dan lebih besar dari atau sama dengan 0')
      .max(100, 'Harga Diskon harus berupa angka yang valid dan maksimal 100'),
    imagesUrls: z.array(z.any()).optional(),
    demoUrl: z.string().optional(),
    documentationUrl: z.string().optional(),
    techStacks: z.array(z.string()).min(1, 'Setidaknya satu teknologi yang digunakan diperlukan'),
    tags: z.array(z.string()).min(1, 'Setidaknya satu tag diperlukan'),
    sold: z
      .number()
      .min(0, 'Jumlah terjual harus berupa angka non-negatif')
      .int('Jumlah terjual harus berupa angka bulat'),
    isPublished: z.boolean(),
    fileUrl: z.string().optional()
  })
  .superRefine((data, ctx) => {
    const price = data.price
    const discountPrice = data.discountPrice

    // Validasi harga diskon tidak lebih dari harga
    if (discountPrice > price) {
      ctx.addIssue({
        path: ['discountPrice'],
        message: 'Harga Diskon tidak boleh lebih besar dari Harga',
        code: z.ZodIssueCode.custom
      })
    }

    // Validasi diskon tidak lebih dari 100% dari harga
    if (discountPrice > price) {
      ctx.addIssue({
        path: ['discountPrice'],
        message: 'Diskon tidak boleh lebih dari 100%',
        code: z.ZodIssueCode.custom
      })
    }
  })

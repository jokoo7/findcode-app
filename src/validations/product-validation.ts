import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().min(2).max(50),
  slug: z.string(),
  description: z.string().optional(),
  tech_stacks: z.array(z.string()).min(1, 'Select at least one tech stack'),
  images: z.any(),
  price: z
    .string()
    .transform(value => parseFloat(value))
    .refine(value => !isNaN(value) && value >= 0, {
      message: 'Price must be a valid number greater than or equal to 0.'
    }),
  diskon: z
    .string()
    .transform(value => parseFloat(value))
    .refine(value => !isNaN(value) && value >= 0, {
      message: 'Diskon must be a valid number greater than or equal to 0.'
    }),
  sold: z
    .string()
    .transform(value => parseFloat(value))
    .refine(value => !isNaN(value) && value >= 0, {
      message: 'Sold must be a valid number greater than or equal to 0.'
    })
})

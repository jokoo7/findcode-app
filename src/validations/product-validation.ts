import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().min(2).max(50),
  slug: z.string(),
  description: z.string().optional(),
  tech_stacks: z.array(z.string()).min(1, 'Select at least one tech stack'),
  images: z.any(),
  price: z.string(),
  diskon: z.string(),
  sold: z.string()
})

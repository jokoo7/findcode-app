import { PRODUCT_CATEGORIES as productCategory } from '@/config'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findProductCategory = (category: string | undefined) => {
  return productCategory.find(({ value }) => value === category)
}

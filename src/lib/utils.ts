import { PRODUCT_CATEGORIES as productCategory } from '@/config'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findProductCategory = (category: string | undefined) => {
  return productCategory.find(({ value }) => value === category)
}

export const roundPrice = (price: number) => {
  // Membulatkan ke ribuan terdekat
  return Math.round(price / 1000) * 1000
}

export const calculateDiscount = (price: number, discountPercentage: number): number => {
  if (discountPercentage === 100) {
    return 0
  }

  const discount = (price * discountPercentage) / 100
  const result = price - discount
  return roundPrice(result)
}

export const formatCurrencyID = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Tidak ada angka di belakang koma
    maximumFractionDigits: 0 // Tidak ada angka di belakang koma
  }).format(amount)
}

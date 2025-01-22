import { PRODUCT_CATEGORIES as productCategory } from '@/constants/product-categories'
import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import relativeTime from 'dayjs/plugin/relativeTime'
import { twMerge } from 'tailwind-merge'

// Extend Day.js dengan plugin relativeTime
dayjs.extend(relativeTime)
dayjs.locale('id') // Atur ke Bahasa Indonesia (opsional)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findProductCategory = (categoryId: string | undefined) => {
  return productCategory.find(({ id }) => id === categoryId)
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

// Fungsi untuk waktu relatif
export const formatRelativeTime = (timestamp: Date | string | number): string => {
  const date = dayjs(timestamp)
  return date.fromNow()
}

// Fungsi untuk format kustom
export const formatCustomDate = (
  timestamp: Date | string | number,
  format: string = 'MMM DD YYYY'
): string => {
  const date = dayjs(timestamp)
  return date.format(format)
}

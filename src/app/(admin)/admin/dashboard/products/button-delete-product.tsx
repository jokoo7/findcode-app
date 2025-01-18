'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ProductImages } from '@/types/product'
import { Trash2 } from 'lucide-react'
import React from 'react'

interface IProps {
  images: ProductImages[]
  id: string
}

const ButtonDeleteProduct = ({ images, id }: IProps) => {
  async function handleDelete() {
    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images, id })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete file and data')
      }

      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button className="w-full" onClick={handleDelete}>
      <DropdownMenuItem className="cursor-pointer">
        <Trash2 /> Delete
      </DropdownMenuItem>
    </button>
  )
}

export default ButtonDeleteProduct

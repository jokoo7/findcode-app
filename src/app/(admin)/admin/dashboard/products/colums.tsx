'use client'

import Link from 'next/link'

import Image from '@/components/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { calculateDiscount, formatCurrencyID, roundPrice } from '@/lib/utils'
import { Product } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Copy, Eye, MoreHorizontal, Pencil } from 'lucide-react'

import ButtonDeleteProduct from './button-delete-product'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'index',
    header: ({ column }) => {
      const handleSorting = () => {
        column.toggleSorting(column.getIsSorted() === 'asc')
      }

      return (
        <Button variant="ghost" onClick={handleSorting}>
          No
          <ArrowUpDown className="ml-2" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="ml-4 capitalize">{row.index + 1}</div>,
    accessorFn: (_, rowIndex) => rowIndex + 1 // Hitung indeks secara otomatis
  },
  {
    accessorKey: 'images',
    header: 'Image',
    cell: ({ row }) => {
      const images: any = row.getValue('images')
      const img = images?.map((img: any) => img.url)

      return (
        <div className="aspect-video w-20 overflow-hidden">
          {img && (
            <Image
              src={img[0]}
              alt={row.getValue('title')}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )
    }
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue('title')}</div>
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const diskon = parseFloat(row.getValue('diskon'))
      const amountAfterDiskon = calculateDiscount(price, diskon)

      return (
        <div className="flex flex-col">
          {diskon !== 0 && (
            <span className="text-left font-medium text-muted-foreground line-through">
              {formatCurrencyID(price)}
            </span>
          )}
          <span className="text-left font-medium">
            {formatCurrencyID(diskon !== 0 ? amountAfterDiskon : roundPrice(price))}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'diskon',
    header: 'Diskon',
    cell: ({ row }) => {
      const diskon: any = row.getValue('diskon')
      return <span>{diskon === 0 ? '-' : diskon + '%'}</span>
    }
  },
  {
    accessorKey: 'sold',
    header: 'Sold',
    cell: ({ row }) => <span>{row.getValue('sold')}</span>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="space-y-1">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <Copy />
              Copy payment ID
            </DropdownMenuItem>
            <ButtonDeleteProduct images={product.images} id={product.id} />
            <Link href={`/admin/dashboard/products/edit/${product.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil /> Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer">
              <Eye />
              View product details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

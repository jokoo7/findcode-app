'use client'

import Link from 'next/link'

import Image from '@/components/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { calculateDiscount, formatCurrencyID, roundPrice } from '@/lib/utils'
import { Product } from '@/types/product-type'
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
    accessorKey: 'imagesUrls',
    header: 'Image',
    cell: ({ row }) => {
      const images: any = row.getValue('imagesUrls')
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
      const discountPrice = parseFloat(row.getValue('discountPrice'))
      const amountAfterDiskon = calculateDiscount(price, discountPrice)

      return (
        <div className="flex flex-col">
          {discountPrice !== 0 && (
            <span className="text-left text-xs font-medium text-muted-foreground line-through">
              {formatCurrencyID(price)}
            </span>
          )}
          <span className="text-left font-medium">
            {formatCurrencyID(discountPrice !== 0 ? amountAfterDiskon : roundPrice(price))}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'discountPrice',
    header: 'Diskon',
    cell: ({ row }) => {
      const discountPrice: any = row.getValue('discountPrice')
      return <span>{discountPrice === 0 ? '-' : discountPrice + '%'}</span>
    }
  },
  {
    accessorKey: 'sold',
    header: 'Sold',
    cell: ({ row }) => <span>{row.getValue('sold')}</span>
  },
  {
    accessorKey: 'isPublished',
    header: 'Publish Status',
    cell: ({ row }) =>
      row.getValue('isPublished') ? (
        <Badge className="bg-green-500 text-white hover:bg-green-500/80">true</Badge>
      ) : (
        <Badge variant="destructive">false</Badge>
      )
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
            <ButtonDeleteProduct imagesUrls={product.imagesUrls} id={product.id} />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/admin/dashboard/products/edit/${product.id}`}>
                <Pencil /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/admin/dashboard/products/view/${product.id}`}>
                <Eye />
                View product details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

import Link from 'next/link'

import Back from '@/components/back'
import CustomError from '@/components/custom-error'
import Image from '@/components/image'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getDataConvertById } from '@/lib/data'
import {
  calculateDiscount,
  cn,
  formatCurrencyID,
  formatCustomDate,
  formatRelativeTime
} from '@/lib/utils'
import { Product } from '@/types/product-type'
import React from 'react'

interface IProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: IProps) {
  const id = (await params)?.id
  const { data: product, success, message } = await getDataConvertById<Product>('products', id)

  if (!id) {
    return <p className="italic text-muted-foreground">ID Tidak ada.</p>
  }

  if (!product || !success) {
    return <CustomError message={message} />
  }

  const price = product.price
  const diskon = product.discountPrice
  const amountAfterDiskon = calculateDiscount(price, diskon)

  return (
    <>
      <div className="mb-4">
        <Back />
      </div>
      <h1 className="mb-4 text-xl font-medium">View Product ({product.title})</h1>

      <Table className="mb-2 border-b">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Label</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="whitespace-nowrap align-text-top font-medium">Images</TableCell>
            <TableCell>
              <div className="grid grid-cols-3 gap-4">
                {product.imagesUrls.map((img, i) => (
                  <div key={img.public_id} className="aspect-video w-full overflow-hidden">
                    <Image
                      src={img.url}
                      width={200}
                      height={100}
                      alt={`images-${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Title</TableCell>
            <TableCell>{product.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Slug</TableCell>
            <TableCell>{product.slug}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Category</TableCell>
            <TableCell>{product.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Price</TableCell>
            <TableCell>
              {diskon !== 0 && (
                <span className="inline-block text-xs italic text-muted-foreground line-through">
                  {formatCurrencyID(price)}
                </span>
              )}{' '}
              <span className="inline-block text-neutral-800 dark:text-neutral-200">
                {formatCurrencyID(amountAfterDiskon)}
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Diskon</TableCell>
            <TableCell>{product.discountPrice === 0 ? '-' : product.discountPrice + '%'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Sold</TableCell>
            <TableCell>{product.sold}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Demo URL</TableCell>
            <TableCell>
              {product.demoUrl ? (
                <Link href={product.demoUrl as string} className="text-muted-foreground underline">
                  {product.demoUrl}
                </Link>
              ) : (
                '-'
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Doc URL</TableCell>
            <TableCell>
              {product.documentationUrl ? (
                <Link
                  href={product.documentationUrl as string}
                  className="text-muted-foreground underline"
                >
                  {product.documentationUrl}
                </Link>
              ) : (
                '-'
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">File URL</TableCell>
            <TableCell>
              {product.fileUrl ? (
                <Link href={product.fileUrl as string} className="text-muted-foreground underline">
                  {product.fileUrl}
                </Link>
              ) : (
                '-'
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Status Publish</TableCell>
            <TableCell>
              {product.isPublished ? (
                <Badge className="bg-green-500 text-white hover:bg-green-500/80">true</Badge>
              ) : (
                <Badge variant="destructive">false</Badge>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Tech Stacks</TableCell>
            <TableCell>
              <div className="flex gap-2">
                {product.techStacks.map((v, i) => (
                  <Badge variant="outline" key={i}>
                    {v}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Tags</TableCell>
            <TableCell>
              <div className="flex gap-2">
                {product.tags.map((v, i) => (
                  <Badge variant="outline" key={i}>
                    {v}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Created</TableCell>
            <TableCell>
              {formatCustomDate(product.createdAt, 'DD MMM YYYY')}{' '}
              <span className="inline-block italic">({formatRelativeTime(product.createdAt)})</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">Updated</TableCell>
            <TableCell>
              {formatCustomDate(product.updatedAt, 'DD MMM YYYY')}{' '}
              <span className="inline-block italic">({formatRelativeTime(product.updatedAt)})</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="px-2">
        <span className="inline-block whitespace-nowrap text-sm font-medium">Description</span>
        <div
          className="mt-2 text-sm"
          dangerouslySetInnerHTML={{ __html: product?.description?.replace(/\n/g, '<br>') ?? '' }}
        />
      </div>

      <div className="my-6">
        <Link href={`/admin/dashboard/products/edit/${id}`} className={cn(buttonVariants())}>
          Edit Products
        </Link>
      </div>
    </>
  )
}

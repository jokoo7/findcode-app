'use client'

import { useRouter } from 'next/navigation'

import ProductForm from '@/components/product-form'
import { Product, ProductImages } from '@/types/product'
import { formSchema } from '@/validations/product-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface IProps {
  children: React.ReactNode
  id?: string
  product?: Product
}

export default function ProductFormLayout({ children, id, product }: IProps) {
  const router = useRouter()

  const [files, setFiles] = React.useState<File[] | null>(null)
  const [prevImages, setPrevImages] = React.useState<ProductImages[] | undefined>(undefined)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      tech_stacks: [],
      price: '0',
      diskon: '0',
      sold: '0'
    }
  })

  const { watch, setValue, reset, formState } = form
  const titleToSlug = watch('title')

  React.useEffect(() => {
    if (product || id) {
      setPrevImages(product?.images)
      reset({
        title: product?.title ?? '',
        slug: product?.slug ?? '',
        description: product?.description ?? '',
        tech_stacks: product?.tech_stacks ?? [],
        price: product?.price.toString(),
        diskon: product?.diskon.toString(),
        sold: product?.sold.toString()
      })
    }
  }, [product, reset, id])

  React.useEffect(() => {
    if (titleToSlug) {
      const generatedlug = titleToSlug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
      setValue('slug', generatedlug)
    } else {
      setValue('slug', '')
    }
  }, [setValue, titleToSlug])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()

    if (!files || files.length === 0) {
      if (!id) return toast.error('Wajib masukkan images.')
    } else {
      // Tambahkan file satu per satu ke FormData
      Array.from(files).forEach(file => {
        formData.append('images', file)
      })
    }

    if (id) formData.append('product_id', id)

    formData.append('title', values.title)
    formData.append('description', values.description ?? '')
    formData.append('slug', values.slug)
    formData.append('price', values.price.toString())
    formData.append('diskon', values.diskon.toString())
    formData.append('sold', values.sold.toString())
    formData.append('tech_stacks', JSON.stringify(values.tech_stacks))

    if (prevImages) {
      formData.append('prev_images', JSON.stringify(prevImages))
    }

    try {
      const response = await fetch('/api/products', {
        method: id ? 'PATCH' : 'POST',
        body: formData
      })
      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message)
      } else {
        form.reset()
        setFiles(null)

        toast.success(data.message)
        router.refresh()
      }
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <>
      <div className="mx-auto mb-10 max-w-3xl">
        {children}
        <ProductForm
          form={form}
          filesState={{ files, setFiles }}
          isLoading={formState.isSubmitting}
          onSubmit={onSubmit}
          labelButton={id ? 'Update' : 'Create'}
        />
      </div>
    </>
  )
}

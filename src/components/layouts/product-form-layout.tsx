'use client'

import { useRouter } from 'next/navigation'

import Back from '@/components/back'
import ProductForm from '@/components/product-form'
import GlobalSkeleton from '@/components/skeleton/global-skeleton'
import { Product, ProductImages } from '@/types/product-type'
import { formSchema } from '@/validations/product-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useMutationData } from '@/hooks/use-mutation'

interface IProps {
  children: React.ReactNode
  id?: string
  product?: Product
}

export default function ProductFormLayout({ children, id, product }: IProps) {
  const mutation = useMutationData({
    func: onSubmit,
    queryKey: ['products']
  })

  const router = useRouter()
  const [files, setFiles] = React.useState<File[] | null>(null)
  const [prevImages, setPrevImages] = React.useState<ProductImages[] | undefined>(undefined)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      category: '',
      price: 0,
      discountPrice: 0,
      demoUrl: '',
      documentationUrl: '',
      sold: 0,
      tags: [],
      techStacks: [],
      isPublished: false,
      fileUrl: ''
    }
  })

  const { watch, setValue, reset } = form
  const titleToSlug = watch('title')

  React.useEffect(() => {
    if (product || id) {
      setPrevImages(product?.imagesUrls)
      reset({
        title: product?.title ?? '',
        slug: product?.slug ?? '',
        description: product?.description ?? '',
        techStacks: product?.techStacks ?? [],
        tags: product?.tags ?? [],
        price: product?.price ?? 0,
        discountPrice: product?.discountPrice ?? 0,
        sold: product?.sold ?? 0,
        category: product?.category ?? '',
        demoUrl: product?.demoUrl ?? '',
        documentationUrl: product?.documentationUrl ?? '',
        fileUrl: product?.fileUrl ?? '',
        isPublished: product?.isPublished ?? false
      })
    }
  }, [product, reset, id])

  React.useEffect(() => {
    if (titleToSlug) {
      const generatedSlug = titleToSlug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
      setValue('slug', generatedSlug)
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
        formData.append('imagesUrls', file)
      })
    }

    if (id) formData.append('productId', id)

    formData.append('title', values.title)
    formData.append('slug', values.slug)
    formData.append('category', values.category)
    formData.append('techStacks', JSON.stringify(values.techStacks))
    formData.append('tags', JSON.stringify(values.tags))
    formData.append('price', values.price.toString())
    formData.append('discountPrice', values.discountPrice.toString())
    formData.append('sold', values.sold.toString())
    formData.append('demoUrl', values.demoUrl ?? '')
    formData.append('documentationUrl', values.documentationUrl ?? '')
    formData.append('fileUrl', values.fileUrl ?? '')
    formData.append('isPublished', JSON.stringify(values.isPublished))
    formData.append('description', values.description ?? '')

    if (prevImages) {
      formData.append('prevImagesUrls', JSON.stringify(prevImages))
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
        if (id) router.refresh()
      }
    } catch (error: any) {
      toast.error(error)
    }
  }

  if (mutation.isPending) {
    return <GlobalSkeleton className="mx-auto max-w-3xl" />
  }

  return (
    <>
      <div className="mx-auto mb-10 max-w-3xl">
        <div className="mb-4">
          <Back />
        </div>
        {children}
        <ProductForm
          form={form}
          filesState={{ files, setFiles }}
          isLoading={mutation.isPending}
          onSubmit={mutation.mutate}
          labelButton={id ? 'Update' : 'Create'}
        />
      </div>
    </>
  )
}

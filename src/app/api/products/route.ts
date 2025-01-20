import { NextResponse } from 'next/server'

import cloudinary from '@/lib/cloudinary'
import { createData, deleteData, updateData } from '@/services/firebase.service'
import { ProductImages } from '@/types/product'
import { serverTimestamp } from 'firebase/firestore'

// Fungsi untuk menghapus file dari Cloudinary jika dibutuhkan
const deleteFilesFromCloudinary = async (publicIds: string[]) => {
  const deletePromises = publicIds.map(publicId => {
    return cloudinary.uploader.destroy(publicId)
  })
  await Promise.all(deletePromises)
}

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const imagesUrls = data.getAll('imagesUrls') as File[]

    // Ambil data lainnya dari FormData
    const title = data.get('title') as string
    const slug = data.get('slug') as string
    const description = data.get('description') as string | undefined
    const price = Number(data.get('price'))
    const discountPrice = Number(data.get('discountPrice'))
    const sold = Number(data.get('sold'))
    const techStacks = JSON.parse(data.get('techStacks') as string) as string[]
    const category = data.get('category') as string
    const tags = JSON.parse(data.get('tags') as string) as string[]
    const demoUrl = data.get('demoUrl') as string | undefined
    const documentationUrl = data.get('documentationUrl') as string | undefined
    const fileUrl = data.get('fileUrl') as string | undefined
    const isPublished = JSON.parse(data.get('isPublished') as string) as boolean

    if (!imagesUrls || imagesUrls.length === 0) {
      return NextResponse.json({ success: false, message: 'No imagesUrls provided' }, { status: 400 })
    }

    // Upload file ke Cloudinary
    const uploadPromises = imagesUrls.map(file => {
      return new Promise((resolve, reject) => {
        const reader = file.stream().getReader()
        const chunks: Uint8Array[] = []

        reader.read().then(function process({ done, value }): any {
          if (done) {
            const buffer = Buffer.concat(chunks)
            cloudinary.uploader
              .upload_stream({ folder: 'findcode/projects/images' }, (error, result) => {
                if (error) reject(error)
                resolve(result)
              })
              .end(buffer)
          } else {
            chunks.push(value)
            return reader.read().then(process)
          }
        })
      })
    })

    // Tunggu semua file selesai di-upload
    const results = await Promise.all(uploadPromises)

    const fileUrls = results.map((result: any) => ({
      url: result.secure_url,
      public_id: result.public_id
    }))
    const publicIds = results.map((result: any) => result.public_id)

    // Simpan data ke database
    const newData = {
      title,
      slug,
      price,
      discountPrice,
      techStacks,
      category,
      tags,
      demoUrl,
      documentationUrl,
      fileUrl,
      sold,
      description,
      imagesUrls: fileUrls,
      isPublished,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const isSaved = await createData('products', newData)

    if (!isSaved) {
      await deleteFilesFromCloudinary(publicIds)
      return NextResponse.json(
        { success: false, message: 'Failed to save product data to database' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Yess!! Success create product' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { success: false, message: `Error processing request api` },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.formData()
    const id = data.get('productId') as string
    if (!id) {
      return NextResponse.json({ success: false, message: 'Product ID tidak ada' })
    }

    // Ambil data lainnya dari FormData
    const imagesUrls = data.getAll('imagesUrls') as File[]
    const title = data.get('title') as string
    const slug = data.get('slug') as string
    const description = data.get('description') as string | undefined
    const price = Number(data.get('price'))
    const discountPrice = Number(data.get('discountPrice'))
    const sold = Number(data.get('sold'))
    const techStacks = JSON.parse(data.get('techStacks') as string) as string[]
    const category = data.get('category') as string
    const tags = JSON.parse(data.get('tags') as string) as string[]
    const demoUrl = data.get('demoUrl') as string | undefined
    const documentationUrl = data.get('documentationUrl') as string | undefined
    const fileUrl = data.get('fileUrl') as string | undefined
    const isPublished = JSON.parse(data.get('isPublished') as string) as boolean

    const prevImagesUrls = JSON.parse(data.get('prevImagesUrls') as string) as ProductImages[]

    let resultImages = prevImagesUrls

    if (imagesUrls.length > 0) {
      // Hapus gambar lama dari Cloudinary
      const oldImagePublicIds = prevImagesUrls.map(image => image.public_id)
      await deleteFilesFromCloudinary(oldImagePublicIds)

      // Upload gambar baru ke Cloudinary
      const uploadPromises = imagesUrls.map(file => {
        return new Promise((resolve, reject) => {
          const reader = file.stream().getReader()
          const chunks: Uint8Array[] = []

          reader.read().then(function process({ done, value }): any {
            if (done) {
              const buffer = Buffer.concat(chunks)
              cloudinary.uploader
                .upload_stream({ folder: 'findcode/projects/images' }, (error, result) => {
                  if (error) reject(error)
                  resolve(result)
                })
                .end(buffer)
            } else {
              chunks.push(value)
              return reader.read().then(process)
            }
          })
        })
      })

      const resultPromise = await Promise.all(uploadPromises)
      resultImages = resultPromise.map((result: any) => ({
        url: result.secure_url,
        public_id: result.public_id
      }))
    }

    // Simpan data ke database
    const newUpdateData = {
      title,
      slug,
      price,
      discountPrice,
      techStacks,
      category,
      tags,
      demoUrl,
      documentationUrl,
      fileUrl,
      sold,
      description,
      imagesUrls: resultImages,
      isPublished,
      updatedAt: serverTimestamp()
    }

    const isSaved = await updateData('products', id, newUpdateData)
    if (!isSaved) {
      return NextResponse.json(
        { success: false, message: 'Failed to save product data to database' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Yess!! Success create product' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { success: false, message: `Error processing request api` },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json()
    const { imagesUrls, id } = data

    // Validasi input
    if (!imagesUrls || !id) {
      return NextResponse.json({ error: 'Images and document ID are required' }, { status: 400 })
    }

    const publicIds = imagesUrls.map((image: any) => image.public_id)

    const isDeleted = await deleteData('products', id)
    if (!isDeleted) {
      return NextResponse.json(
        { success: false, message: 'Failed to save product data to database' },
        { status: 500 }
      )
    } else {
      // delete images in claudinary
      await deleteFilesFromCloudinary(publicIds)
    }

    return NextResponse.json(
      { success: true, message: 'Yess!! Success create product' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { success: false, message: `Error processing request api` },
      { status: 500 }
    )
  }
}

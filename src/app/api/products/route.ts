import { NextResponse } from 'next/server'

import cloudinary from '@/lib/cloudinary'
import { createData, deleteData, updateData } from '@/services/firebase.service'
import { ProductImages } from '@/types/product'

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
    const images = data.getAll('images') as File[]

    // Ambil data lainnya dari FormData
    const title = data.get('title') as string
    const slug = data.get('slug') as string
    const description = data.get('description') as string
    const price = Number(data.get('price'))
    const diskon = Number(data.get('diskon'))
    const sold = Number(data.get('sold'))
    const tech_stacks = JSON.parse(data.get('tech_stacks') as string) as string[]

    if (!images || images.length === 0) {
      return NextResponse.json({ success: false, message: 'No images provided' }, { status: 400 })
    }

    // Upload file ke Cloudinary
    const uploadPromises = images.map(file => {
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
      diskon,
      sold,
      description,
      tech_stacks,
      images: fileUrls
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
    const id = data.get('product_id') as string
    if (!id) {
      return NextResponse.json({ success: false, message: 'Product ID tidak ada' })
    }

    const images = data.getAll('images') as File[]
    const title = data.get('title') as string
    const slug = data.get('slug') as string
    const description = data.get('description') as string
    const price = Number(data.get('price'))
    const diskon = Number(data.get('diskon'))
    const sold = Number(data.get('sold'))
    const tech_stacks = JSON.parse(data.get('tech_stacks') as string) as string[]
    const prev_images = JSON.parse(data.get('prev_images') as string) as ProductImages[]

    let resultImages = prev_images

    if (images.length > 0) {
      // Hapus gambar lama dari Cloudinary
      const oldImagePublicIds = prev_images.map(image => image.public_id)
      await deleteFilesFromCloudinary(oldImagePublicIds)

      // Upload gambar baru ke Cloudinary
      const uploadPromises = images.map(file => {
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
      diskon,
      sold,
      description,
      tech_stacks,
      images: resultImages
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
    const { images, id } = data

    // Validasi input
    if (!images || !id) {
      return NextResponse.json({ error: 'Images and document ID are required' }, { status: 400 })
    }

    const publicIds = images.map((image: any) => image.public_id)

    const isDeleted = await deleteData('products', id)
    if (!isDeleted) {
      return NextResponse.json(
        { success: false, message: 'Failed to save product data to database' },
        { status: 500 }
      )
    }

    // delete images in claudinary
    await deleteFilesFromCloudinary(publicIds)

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

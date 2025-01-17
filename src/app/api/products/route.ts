import { NextResponse } from 'next/server'

import cloudinary from '@/lib/cloudinary'
import { createData } from '@/services/firebase.service'

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

    // Mengambil URL dari hasil upload
    const fileUrls = results.map((result: any) => result.secure_url)
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

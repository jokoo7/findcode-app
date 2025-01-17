import { v2 as cloudinary } from 'cloudinary'

// Menentukan tipe untuk variabel lingkungan
interface CloudinaryConfig {
  CLOUDINARY_CLOUD_NAME: string
  CLOUDINARY_API_KEY: string
  CLOUDINARY_API_SECRET: string
}

// Mengambil variabel lingkungan dengan tipe yang tepat
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env as unknown as CloudinaryConfig

// Mengkonfigurasi Cloudinary dengan API keys yang Anda dapatkan
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})

export default cloudinary

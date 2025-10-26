# FindCode - Marketplace Source Code

<div align="center">
  <h3>Platform Marketplace untuk Membeli dan Menjual Source Code Berkualitas</h3>
  <p>Temukan source code terbaik siap pakai untuk proyek Anda dengan harga terjangkau</p>
</div>

---

## 📋 Deskripsi

FindCode adalah platform marketplace modern yang dirancang khusus untuk mempermudah developer dalam menemukan, membeli, dan mengelola source code berkualitas tinggi. Platform ini menyediakan berbagai kategori produk mulai dari starter kits, UI templates, learning projects, hingga source code unik lainnya.

## ✨ Fitur Utama

### 🛍️ Untuk Pengguna

- **Pencarian & Filter Produk** - Cari produk berdasarkan kategori, keyword, dan filter lanjutan
- **Detail Produk Lengkap** - Lihat preview, dokumentasi, tech stack yang digunakan
- **Sistem Diskon** - Dapatkan produk dengan harga promo
- **Responsive Design** - Tampilan optimal di semua perangkat
- **Dark/Light Mode** - Pilihan tema sesuai preferensi
- **Product Similar** - Rekomendasi produk serupa

### 👨‍💼 Dashboard Admin

- **Manajemen Produk** - CRUD lengkap untuk produk (Create, Read, Update, Delete)
- **Upload Multiple Images** - Upload hingga 5 gambar per produk
- **Image Management** - Integrasi dengan Cloudinary untuk penyimpanan gambar
- **Data Table** - Tabel interaktif dengan sorting, filtering, dan pagination
- **Real-time Updates** - Perubahan data langsung terlihat tanpa refresh
- **Product Analytics** - Dashboard dengan statistik produk dan kontak

## 🚀 Teknologi yang Digunakan

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework dengan App Router
- **[React 19](https://react.dev/)** - Library UI
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Komponen UI yang dapat disesuaikan

### Backend & Database

- **[Firebase Firestore](https://firebase.google.com/docs/firestore)** - NoSQL database
- **[Cloudinary](https://cloudinary.com/)** - Cloud storage untuk gambar
- **[Jose](https://github.com/panva/jose)** - JWT authentication

### State Management & Data Fetching

- **[TanStack Query (React Query)](https://tanstack.com/query)** - Server state management
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### UI Components & Libraries

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Day.js](https://day.js.org/)** - Date manipulation

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Lint-staged](https://github.com/okonet/lint-staged)** - Run linters on staged files

## 📦 Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** versi 18.x atau lebih baru
- **npm** atau **yarn** atau **pnpm**
- **Git**

## 🛠️ Instalasi

1. **Clone repository**

```bash
git clone https://github.com/username/findcode-app.git
cd findcode-app
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Setup environment variables**

Buat file `.env.local` di root project dan tambahkan konfigurasi berikut:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Session Secret
SESSION_SECRET=your_session_secret_key
```

4. **Setup Firebase**

- Buat project di [Firebase Console](https://console.firebase.google.com/)
- Aktifkan Firestore Database
- Buat collection `users` dan tambahkan dokumen dengan field:

```json
{
  "username": "admin",
  "password": "your_password"
}
```

5. **Setup Cloudinary**

- Daftar di [Cloudinary](https://cloudinary.com/)
- Dapatkan API credentials dari dashboard
- Buat folder `findcode/projects/images` untuk penyimpanan gambar

6. **Jalankan development server**

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
findcode-app/
├── public/                 # Static files
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (admin)/       # Admin routes (protected)
│   │   │   └── admin/
│   │   │       └── dashboard/
│   │   ├── (auth)/        # Auth routes
│   │   │   └── login/
│   │   ├── product/       # Product detail pages
│   │   ├── products/      # Products listing
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── layouts/       # Layout components
│   │   ├── provider/      # Context providers
│   │   └── skeleton/      # Loading skeletons
│   ├── constants/         # Constants & configurations
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── validations/       # Zod schemas
├── .env.local             # Environment variables
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## 🎯 Penggunaan

### Untuk User (Frontend)

1. **Browse Produk**

   - Kunjungi halaman utama untuk melihat produk terbaru
   - Gunakan filter kategori atau search untuk mencari produk spesifik

2. **Detail Produk**
   - Klik produk untuk melihat detail lengkap
   - Lihat preview, dokumentasi, dan tech stack
   - Dapatkan source code melalui link download

### Untuk Admin (Dashboard)

1. **Login Admin**

```
URL: http://localhost:3000/login
Username: admin
Password: [sesuai yang dibuat di Firebase]
```

2. **Manajemen Produk**

   - **Create**: Klik "Create New Product" dan isi form
   - **Read**: Lihat semua produk di data table
   - **Update**: Klik icon edit pada produk
   - **Delete**: Klik icon delete dan konfirmasi

3. **Upload Gambar**
   - Drag & drop atau klik untuk upload
   - Maksimal 5 gambar per produk
   - Format: JPG, PNG, GIF (max 4MB per file)

## 🔧 Scripts

```bash
# Development
npm run dev          # Jalankan development server

# Production
npm run build        # Build untuk production
npm run start        # Jalankan production server

# Code Quality
npm run lint         # Jalankan ESLint
npm run format       # Format code dengan Prettier
```

## 🎨 Kategori Produk

- **Starter Kits** - Boilerplate proyek siap pakai
- **UI Templates** - Template antarmuka pengguna
- **Learning Projects** - Proyek untuk pembelajaran
- **Other** - Source code unik lainnya

## 🔐 Authentication & Security

- Session-based authentication menggunakan JWT
- Cookie HTTP-only untuk keamanan
- Middleware untuk protected routes
- Password hashing (implementasi di Firebase)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: xs (512px), sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized untuk semua ukuran layar

## 🚧 Roadmap

- [ ] Payment gateway integration
- [ ] User registration & profile
- [ ] Review & rating system
- [ ] Wishlist functionality
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Multi-language support

## 🤝 Kontribusi

Kontribusi selalu diterima! Berikut cara berkontribusi:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Guidelines Kontribusi

- Follow existing code style
- Write meaningful commit messages
- Update documentation jika diperlukan
- Test perubahan sebelum submit PR

## 🐛 Bug Reports

Jika menemukan bug, silakan buat issue dengan informasi:

- Deskripsi bug
- Steps to reproduce
- Expected behavior
- Screenshots (jika ada)
- Environment (OS, browser, Node version)

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

```
MIT License

Copyright (c) 2025 FindCode

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Your Name**

- Website: [https://findcode.com](https://findcode.com)
- Email: sannbusiness16@gmail.com
- WhatsApp: 082299841605

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/)
- [Vercel](https://vercel.com/) for deployment

---

<div align="center">
  <p>Made with ❤️ by FindCode Team</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>

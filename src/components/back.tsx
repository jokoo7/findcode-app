'use client'

import { useRouter } from 'next/navigation'

import { CircleArrowLeft } from 'lucide-react'

const Back = () => {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className="group flex items-center gap-2">
      <CircleArrowLeft size={17} />{' '}
      <span className="block transition-all group-hover:translate-x-1">Kembali</span>
    </button>
  )
}

export default Back

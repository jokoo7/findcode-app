import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import * as React from 'react'

interface IProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: IProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex-1 flex-grow">{children}</div>
      <Footer />
    </>
  )
}

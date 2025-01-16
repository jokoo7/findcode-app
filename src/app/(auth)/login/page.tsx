import LoginForm from '@/components/login-form'
import React from 'react'

export default function page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-sm px-6 sm:px-0">
        <LoginForm />
      </div>
    </div>
  )
}

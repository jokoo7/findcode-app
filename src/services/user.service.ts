import { redirect } from 'next/navigation'

import { checkIfDataExixts } from '@/services/firebase.service'
import { createSession, deleteSession } from '@/services/session.service'

type FormSate = { message?: string } | undefined

export const login = async (state: FormSate, payload: FormData) => {
  const username = payload.get('username')
  const password = payload.get('password')

  const existingUser = await checkIfDataExixts('users', 'password', password as string)
  if (!existingUser) {
    return {
      message: 'username atau password salah!'
    }
  }

  await createSession({ username })
  redirect('/admin/dashboard')
}

export const logout = async () => {
  await deleteSession()
  redirect('/login')
}

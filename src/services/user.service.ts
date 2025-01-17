import { redirect } from 'next/navigation'

import { checkIfDataExixts } from '@/services/firebase.service'
import { createSession, deleteSession } from '@/services/session.service'
import { FormState } from '@/types/user'

export const login = async (state: FormState, payload: FormData) => {
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

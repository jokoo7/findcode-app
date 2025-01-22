import { redirect } from 'next/navigation'

import { checkIfDataExists } from '@/services/firebase-service'
import { createSession, deleteSession } from '@/services/session-service'
import { FormState } from '@/types/user-type'

export const login = async (state: FormState, payload: FormData) => {
  const username = payload.get('username')
  const password = payload.get('password')

  const { success } = await checkIfDataExists('users', 'password', password as string)
  if (!success) {
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

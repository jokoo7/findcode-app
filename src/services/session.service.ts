'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { SignJWT, jwtVerify } from 'jose'
import { cache } from 'react'

const scretKey = process.env.SESSION_SECRET
const key = new TextEncoder().encode(scretKey)

const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key)
}

export const createSession = async (payload: any) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ payload, expires })

  ;(await cookies()).set('session', session, {
    expires,
    httpOnly: true
  })
}

export const decrypt = async (session: string | undefined = '') => {
  if (!session) return null
  try {
    const { payload } = await jwtVerify(session, key, { algorithms: ['HS256'] })
    return payload
  } catch (error) {
    console.log('Failed to verify session', error)
    return null
  }
}

export const deleteSession = async () => {
  ;(await cookies()).set('session', '', { expires: new Date(0) })
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session: any = await decrypt(cookie)

  if (!session) {
    redirect('/login')
  }

  return {
    username: session?.payload?.username
  }
})

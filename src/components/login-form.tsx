'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { login } from '@/services/user-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(8)
})

export default function LoginForm() {
  const [state, FormAction, isPending] = useActionState(login, undefined)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'admin',
      password: ''
    }
  })

  return (
    <Form {...form}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <span className="mt-2 block text-sm text-muted-foreground">
          Masukkan username dan password anda.
        </span>
        {state?.message && (
          <p className="mt-1 text-[0.8rem] italic text-destructive">*{state.message}</p>
        )}
      </div>
      <form action={FormAction} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="admin" {...field} required />
              </FormControl>
              <FormDescription>Masukkan username anda.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="***" {...field} type="password" required />
              </FormControl>
              <FormDescription>Masukkan password anda.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

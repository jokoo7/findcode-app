'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ProductImages } from '@/types/product-type'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { useMutationData } from '@/hooks/use-mutation'

interface IProps {
  imagesUrls: ProductImages[]
  id: string
}

const ButtonDeleteProduct = ({ imagesUrls, id }: IProps) => {
  const mutation = useMutationData({
    func: handleDelete,
    queryKey: ['products']
  })

  async function handleDelete() {
    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagesUrls, id })
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.message || 'Failed to delete file and data')
      } else {
        toast.success(result.message || 'Success to delete file and data')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-secondary focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
          <Trash2 /> Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus produk Anda secara permanen
            dan menghapus data produk Anda dari server kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => mutation.mutate()} disabled={mutation.isPending} variant="destructive">
            {mutation.isPending ? 'Loading...' : 'Continue'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonDeleteProduct

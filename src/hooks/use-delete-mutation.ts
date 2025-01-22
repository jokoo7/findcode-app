import { ProductImages } from '@/types/product-type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type DeleteDataOption = {
  queryKey: string | string[]
  deleteFn: ({ imagesUrls, id }: { imagesUrls: ProductImages[]; id: string }) => Promise<void>
}

export const useDeleteMutation = ({ deleteFn, queryKey }: DeleteDataOption) => {
  const queryCLient: any = useQueryClient()

  return useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryCLient.invalidateQueries(queryKey)
      toast.success('Success delete data.')
    },
    onError: (error: Error) => {
      console.log('delete data: ', error)
      toast.error('Error delete data.')
    }
  })
}

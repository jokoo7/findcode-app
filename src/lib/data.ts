import {
  convertFirestoreData,
  retriveData,
  retriveDataByField,
  retriveDataById
} from '@/services/firebase-service'
import { Product } from '@/types/product-type'
import { Response } from '@/types/response-type'

type FiltersProducts = {
  category?: string
  query?: string
}

export const getData = async <T>(collectionName: string): Promise<Response<T[]>> => {
  const { data: fetchedData, success } = await retriveData<T>(collectionName)
  if (!success) {
    return {
      success: false,
      message: 'Failed retrive data from database'
    }
  }

  const data = fetchedData?.map(convertFirestoreData)
  return {
    success: true,
    message: 'Success ambil data from database',
    data
  }
}

export const getDataById = async <T>(collectionName: string, id: string): Promise<Response<T>> => {
  const { data: fetchedData, success, message } = await retriveDataById(collectionName, id)
  if (!success) {
    return {
      success: false,
      message
    }
  }
  const data = convertFirestoreData(fetchedData)

  return {
    success: true,
    message: 'Success ambil data from database',
    data
  }
}

export const getDataByFields = async <T>(
  collectionName: string,
  fieldValue: { field: string; value: any }
): Promise<Response<T[]>> => {
  const { data: fetchedData, success } = await retriveDataByField<T>(collectionName, fieldValue)
  if (!success) {
    return {
      success: false,
      message: 'Failed retrive data from database'
    }
  }

  const data: T[] | undefined = fetchedData?.map(convertFirestoreData)

  return {
    success: true,
    message: 'Success ambil data from database',
    data
  }
}

export const getDataByFilters = async <T>(
  collectionName: string,
  filters: FiltersProducts
): Promise<Response<T[]>> => {
  const { data: fetchedData, success } = await retriveData<T>(collectionName)
  if (!success) {
    return {
      success: false,
      message: 'Failed retrive data from database'
    }
  }

  let data = fetchedData

  if (filters.category) {
    data = fetchedData?.filter((doc: any) => doc.category === filters.category)
  }

  if (filters.query) {
    data = fetchedData?.filter((doc: any) =>
      doc.title.toLowerCase().includes(filters.query?.toLowerCase())
    )
  }

  if (filters.category && filters.query) {
    data = fetchedData
      ?.filter((doc: any) => doc.title.toLowerCase().includes(filters.query?.toLowerCase()))
      .filter((doc: any) => doc.category === filters.category)
  }

  const result = data?.map(convertFirestoreData)

  return {
    success: true,
    message: 'Success ambil data from database',
    data: result
  }
}

export const getProduct = async (): Promise<Response<Product[]>> => {
  const { data: product, success, message } = await retriveData<Product>('products')
  if (!success) {
    return {
      success: false,
      message
    }
  }

  return {
    success: true,
    message,
    data: product
  }
}

export const getProductsFilters = async ({
  query,
  category
}: FiltersProducts): Promise<Response<Product[]>> => {
  const { data, success, message } = await retriveData<Product>('products')
  if (!success || !data) {
    return {
      success: false,
      message
    }
  }

  let products = data

  if (category) {
    products = data.filter((doc: any) => doc.category === category)
  }

  if (query) {
    products = data.filter((doc: any) => doc.title.toLowerCase().includes(query?.toLowerCase()))
  }

  if (category && query) {
    products = data
      ?.filter((doc: any) => doc.title.toLowerCase().includes(query?.toLowerCase()))
      .filter((doc: any) => doc.category === category)
  }

  const result = products.map(convertFirestoreData)

  return {
    success: true,
    message: 'Success ambil data from database',
    data: result
  }
}

export const getProductDetail = async (slug: string | undefined): Promise<Response<Product>> => {
  if (!slug) {
    return { success: false, message: 'Slug is required.' }
  }

  const { data, success, message } = await retriveDataByField<Product>('products', {
    field: 'slug',
    value: slug
  })

  if (!success) {
    return {
      success: false,
      message
    }
  }

  const product = data && data[0]

  return {
    success: true,
    message,
    data: product
  }
}

export const getProductsByFields = async <T>(fieldValue: {
  field: string
  value: any
}): Promise<Response<Product[]>> => {
  const { data: fetchedData, success } = await retriveDataByField<T>('products', fieldValue)
  if (!success) {
    return {
      success: false,
      message: 'Failed retrive data from database'
    }
  }

  const data = fetchedData?.map(convertFirestoreData)

  return {
    success: true,
    message: 'Success ambil data from database',
    data
  }
}

import {
  convertFirestoreData,
  retriveData,
  retriveDataByFields,
  retriveDataById
} from '@/services/firebase-service'
import { Response } from '@/types/response-type'

type FiltersData = {
  category?: string
  query?: string
}

export const getDataConvert = async <T>(collectionName: string): Promise<Response<T[]>> => {
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

export const getDataConvertById = async <T>(
  collectionName: string,
  id: string
): Promise<Response<T>> => {
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

export const getDataConvertByFields = async <T>(
  collectionName: string,
  filters: FiltersData
): Promise<Response<T[]>> => {
  const { data: fetchedData, success } = await retriveData<T>(collectionName)
  if (!success) {
    return {
      success: false,
      message: 'Failed retrive data from database'
    }
  }

  let data: any = fetchedData

  if (filters.category) {
    data = fetchedData?.filter((doc: any) => doc.category === filters.category)
  }

  if (filters.query) {
    data = fetchedData?.filter((doc: any) =>
      doc.title.toLowerCase().includes(filters.query?.toLowerCase())
    )
  }

  const result = data?.map(convertFirestoreData)

  return {
    success: true,
    message: 'Success ambil data from database',
    data: result
  }
}

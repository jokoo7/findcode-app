import {
  convertFirestoreData,
  retriveData,
  retriveDataByFields,
  retriveDataById
} from '@/services/firebase-service'
import { Response } from '@/types/response-type'

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
  filters: { field: string; value: any }[]
): Promise<Response<T[]>> => {
  const { data: fetchedData, success } = await retriveDataByFields<T>(collectionName, filters)
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

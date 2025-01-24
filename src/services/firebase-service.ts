import { firestore } from '@/lib/firebase'
import { Response } from '@/types/response-type'
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

export const doesCollectionExist = async <T>(collectionName: string): Promise<Response<T>> => {
  try {
    const snapshot = await getDocs(collection(firestore, collectionName))
    if (snapshot.empty) {
      return { success: false, message: 'Collection name is not exists.' }
    }
    return { success: true }
  } catch {
    return {
      success: false,
      message: 'Failed check collection.'
    }
  }
}

export const checkIfDataExists = async <T>(
  collectionName: string,
  field: string,
  value: string
): Promise<Response<T>> => {
  const isCollectionNameExists = await doesCollectionExist(collectionName)
  if (!isCollectionNameExists.success) {
    return { success: false, message: isCollectionNameExists.message }
  }
  try {
    const docRef = query(collection(firestore, collectionName), where(field, '==', value))
    const querySnapshot = await getDocs(docRef)
    if (querySnapshot.empty) {
      return { success: false, message: 'Document empety atau kosong' }
    }
    return { success: true }
  } catch (error) {
    return { success: false, message: 'Error saat check ke firebase' + error }
  }
}

export const retriveData = async <T>(collectionName: string): Promise<Response<T[]>> => {
  const isCollectionNameExists = await doesCollectionExist(collectionName)
  if (!isCollectionNameExists.success) {
    return { success: false, message: isCollectionNameExists.message }
  }

  try {
    const docRef = collection(firestore, collectionName)
    const snapshot = await getDocs(docRef)
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[]

    return {
      success: true,
      message: 'Success retrive data from collection',
      data
    }
  } catch (error) {
    return { success: false, message: 'Failed to retrieve data from collection.' + error }
  }
}

export const retriveDataById = async <T>(collectionName: string, id: string): Promise<Response<T>> => {
  const isCollectionNameExists = await doesCollectionExist(collectionName)
  if (!isCollectionNameExists.success) {
    return { success: false, message: 'Collection name is not exists.' }
  }

  if (!id) {
    return { success: false, message: 'Document ID is required.' }
  }

  try {
    const docRef = doc(firestore, collectionName, id)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) {
      return {
        success: false,
        message: `No document found with ID '${id}' in collection '${collectionName}'.`
      }
    }

    // Ambil data dari snapshot
    const data = snapshot.data() as T
    return {
      success: true,
      message: 'Document retrieved successfully.',
      data
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while retrieving the document.' + error
    }
  }
}

export const retriveDataByField = async <T>(
  collectionName: string,
  { field, value }: { field: string; value: any }
): Promise<Response<T[]>> => {
  const isCollectionNameExists = await doesCollectionExist(collectionName)
  if (!isCollectionNameExists.success) {
    return { success: false, message: isCollectionNameExists.message }
  }

  try {
    const docRef = query(collection(firestore, collectionName), where(field, '==', value))
    const snapshot = await getDocs(docRef)

    // Ambil data dari Firestore
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[]

    return { success: true, data }
  } catch (error) {
    return { success: false, message: 'Error retrieving data: ' + error }
  }
}

export const createData = async <T>(collectionName: string, data: any): Promise<Response<T>> => {
  const isCollectionNameExists = await doesCollectionExist(collectionName)
  if (!isCollectionNameExists.success) {
    return { success: false, message: 'Collection name is not exists.' }
  }

  try {
    await addDoc(collection(firestore, collectionName), data)
    return { success: true, message: 'Success save data to database' }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save data to database:' + error
    }
  }
}

export const updateData = async <T>(
  collectionName: string,
  id: string,
  data: any
): Promise<Response<T>> => {
  const isCollectionNameExists = await doesCollectionExist(collectionName)
  if (!isCollectionNameExists.success) {
    return { success: false, message: 'Collection name is not exists.' }
  }

  try {
    await updateDoc(doc(firestore, collectionName, id), data)
    return { success: true, message: 'Success update data in database.' }
  } catch (error) {
    return { success: false, message: 'Failed to update data in database:' + error }
  }
}

export const deleteData = async <T>(collectionName: string, id: string): Promise<Response<T>> => {
  const isCollectionNameExists = await doesCollectionExist(collectionName)
  if (!isCollectionNameExists.success) {
    return { success: false, message: 'Collection name is not exists.' }
  }

  try {
    const docRef = doc(firestore, collectionName, id)
    await deleteDoc(docRef)
    return { success: true, message: 'Success delete data from database.' }
  } catch (error) {
    return { success: false, message: 'Failed  delete data from database:' + error }
  }
}

export const convertFirestoreData = (data: any) => ({
  ...data,
  createdAt:
    data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
  updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt
})

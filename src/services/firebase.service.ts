import { firestore } from '@/lib/firebase'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

export const doesCollectionExist = async (collectionName: string): Promise<boolean> => {
  try {
    const snapshot = await getDocs(collection(firestore, collectionName))
    return !snapshot.empty
  } catch {
    return false
  }
}

export const retriveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firestore, collectionName))
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return data
}

export const checkIfDataExixts = async (collectionName: string, field: string, value: string) => {
  const querySnapshot = await getDocs(
    query(collection(firestore, collectionName), where(field, '==', value))
  )
  if (!querySnapshot.empty) {
    return true
  } else {
    return false
  }
}

export const createData = async (collectionName: string, data: any) => {
  try {
    const collectionExists = await doesCollectionExist(collectionName)
    if (!collectionExists) return false
    await addDoc(collection(firestore, collectionName), data)
    return true
  } catch (error) {
    console.error('Failed to add project to database:', error)
    return false
  }
}

export const retriveDataById = async (collectionName: string, id: string) => {
  const snapshot = await getDoc(doc(firestore, collectionName, id))
  const data = snapshot.data()
  return data
}

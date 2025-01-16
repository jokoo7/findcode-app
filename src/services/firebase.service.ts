import { firebase } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const retriveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firebase, collectionName))
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return data
}

export const checkIfDataExixts = async (collectionName: string, field: string, value: string) => {
  const querySnapshot = await getDocs(
    query(collection(firebase, collectionName), where(field, '==', value))
  )
  if (!querySnapshot.empty) {
    return true
  } else {
    return false
  }
}

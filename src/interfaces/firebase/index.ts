import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { clientConfig } from './config'

const firebase = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0]

const auth = getAuth(firebase)
const db = getFirestore(firebase)
const storage = getStorage(firebase)

export { firebase, auth, db, storage }

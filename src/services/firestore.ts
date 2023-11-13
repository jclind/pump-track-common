import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { FirebaseStorage, getStorage } from 'firebase/storage'
import { Firestore, getFirestore } from 'firebase/firestore'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { Auth, getAuth } from 'firebase/auth'
import { Functions, getFunctions } from 'firebase/functions'
import { PlatformError } from 'pump-track-common/util/PlatformError'

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}
type FirebaseInstance = {
  app: firebase.app.App
  firebaseFunctions: Functions
  auth: Auth
  storage: FirebaseStorage
  db: Firestore
  analytics: Analytics
}

let firebaseConfig: FirebaseConfig | null = null
let firebaseInstance: FirebaseInstance | null = null

export function setFirebaseConfig(config: FirebaseConfig) {
  firebaseConfig = config
}

export function initializeFirebase() {
  if (!firebaseConfig) {
    const errorMessage =
      'Firebase configuration not set. Call setFirebaseConfig first.'
    console.error(errorMessage)
    return PlatformError(errorMessage)
  }

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig)
  const firebaseFunctions = getFunctions()
  const auth = getAuth(app)
  const storage = getStorage()
  const db = getFirestore()
  const analytics = getAnalytics(app)

  firebaseInstance = {
    app,
    firebaseFunctions,
    auth,
    storage,
    db,
    analytics,
  }
}

export function getFirebaseInstance(): FirebaseInstance {
  if (!firebaseInstance) {
    throw PlatformError(
      'Firebase not initialized. Call initializeFirebase first.'
    )
  }

  return firebaseInstance
}

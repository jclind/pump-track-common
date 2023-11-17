import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { FirebaseStorage, getStorage } from 'firebase/storage'
import { Firestore, getFirestore } from 'firebase/firestore'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { Auth, getAuth } from 'firebase/auth'
import { Functions, getFunctions } from 'firebase/functions'

import { PlatformError } from '../util/PlatformError'
import { FirebaseConfig, FirebaseInstance } from '../types'

let firebaseConfig: FirebaseConfig | null = null
let firebaseInstance: FirebaseInstance | null = null

export function setFirebaseConfig(config: FirebaseConfig) {
  firebaseConfig = config
}

export function initializeFirebase(
  config: FirebaseConfig
): FirebaseInstance | null {
  if (!config) {
    const errorMessage =
      'Firebase configuration not set. Call setFirebaseConfig first.'
    console.error(errorMessage)
    PlatformError(errorMessage)
    return null
  }

  // Initialize Firebase
  const app = firebase.initializeApp(config)
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

  return firebaseInstance
}

export function getFirebaseInstance(): FirebaseInstance {
  if (!firebaseInstance) {
    throw PlatformError(
      'Firebase not initialized. Call initializeFirebase first.'
    )
  }

  return firebaseInstance
}

import { FirebaseInstance, initializeFirebase } from './services/firestore'
import { ENVIRONMENT_KEY_TYPE, FirebaseConfig } from './types'

// export * as auth from './services/auth'
export * as tracker from './services/tracker'

export * as firestore from './services/firestore'

export let ENVIRONMENT_KEY: ENVIRONMENT_KEY_TYPE = null

export const pumpTrackSetup = async (
  firebaseConfig: FirebaseConfig,
  environmentKey: ENVIRONMENT_KEY_TYPE
): Promise<FirebaseInstance> => {
  const firebaseInstance: FirebaseInstance | null =
    initializeFirebase(firebaseConfig)

  if (firebaseInstance !== null) {
    ENVIRONMENT_KEY = environmentKey
    return firebaseInstance
  } else {
    throw new Error(
      'Firebase: something went wrong, make sure to initialize the app correctly'
    )
  }
}

// export * as useAuthState from './hooks/useAuthState'
export * as PlatformError from './util/PlatformError'

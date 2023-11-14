import { setFirebaseConfig } from './services/firestore'
import { ENVIRONMENT_KEY_TYPE, FirebaseConfig } from './types'

// export * as auth from './services/auth'
export * as tracker from './services/tracker'

export * as firestore from './services/firestore'

export let ENVIRONMENT_KEY: ENVIRONMENT_KEY_TYPE = null

export const pumpTrackSetup = (
  firebaseConfig: FirebaseConfig,
  environmentKey: ENVIRONMENT_KEY_TYPE
) => {
  setFirebaseConfig(firebaseConfig)
  ENVIRONMENT_KEY = environmentKey
}

// export * as useAuthState from './hooks/useAuthState'
export * as PlatformError from './util/PlatformError'

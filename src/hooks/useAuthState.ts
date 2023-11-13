import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { getFirebaseInstance } from 'pump-track-common/services/firestore'
import {
  getUsername,
  updateUserActivity,
} from 'pump-track-common/services/auth'
import { PUMP_TRACK_LS_USERNAME } from 'pump-track-common/services/PUMP_TRACK_LS'

interface AuthState {
  user: User | null
  loading: boolean
}

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const { auth } = getFirebaseInstance()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userInstance => {
      if (userInstance) {
        getUsername().then(() => {
          setUser(userInstance)
          updateUserActivity()
        })
      } else {
        setUser(null)
        localStorage.removeItem(PUMP_TRACK_LS_USERNAME)
      }
      setLoading(false)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, loading }
}

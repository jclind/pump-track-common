import firebase from 'firebase/compat/app'
import { Analytics } from 'firebase/analytics'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { Functions } from 'firebase/functions'
import { FirebaseStorage } from 'firebase/storage'

export type WorkoutDataType = {
  id: string
  name: string
  date: number | null
  exercises: ExerciseDataType[]
}

export type CurrentWorkoutType = {
  workoutTitle: string
  exercises: { id: string; text: string }[]
}

export type ExerciseDataType = {
  id: string
  name: string
  weights: WeightGroupType[]
  originalString: string
}

export type ExercisesServerDataType = {
  id: string
  index: number
  name: string
  originalString: string
  weights: WeightGroupType[]
  workoutDate: number | null
  workoutID: string
  maxWeight: number
}

export type ExercisePRWeightOBJ = {
  maxWeight: number | null
  workoutDate: number | null
}

export type WeightGroupType = {
  sets: number[]
  weight: number
  comment: string
}

export type UserProfileDataType = {
  createdAt: number
  displayName: string
  photoUrl: string
  username: string
  totalWorkouts: number
  totalExercises: number
  lastActive?: number
}

export type ExerciseSelectType = { label: string; value: string }

export type UserFriendsListType = {
  [key: string]: {
    dateFriendRequest: number
    friendshipCreatedAt: number
    status: FriendsStatusType
  }
}

export type FriendsData = {
  friendUID: string
  friendUsername: string
  date: number
}
export type CombinedFriendsData = FriendsData & UserProfileDataType

export type FriendsStatusType =
  | 'friends'
  | 'incoming'
  | 'outgoing'
  | 'not_friends'

export type TimePeriodType =
  | 'week'
  | 'month'
  | '3-month'
  | '6-month'
  | 'year'
  | 'allTime'

export type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}
export type FirebaseInstance = {
  app: firebase.app.App
  firebaseFunctions: Functions
  auth: Auth
  storage: FirebaseStorage
  db: Firestore
  analytics: Analytics
}

export type ENVIRONMENT_KEY_TYPE = 'web' | 'mobile' | null

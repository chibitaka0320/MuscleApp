import { type Timestamp } from 'firebase/firestore'

export interface Sets {
  set: number
  weight: number
  createDate: Timestamp
  id?: string
}

export interface Events {
  eventName: string
  sets: Sets[]
}

export interface Parts {
  parts: string
  events: Events[]
}

export interface FirebaseTraining {
  parts: string
  events: string
  set: number
  weight: number
  createDate: Timestamp
  id: string
}

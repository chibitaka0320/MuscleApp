import { type Timestamp } from 'firebase/firestore'

export interface UserInfo {
  userName?: string
  height?: string
  weight?: string
  birthday?: Timestamp
  gender?: string
  activeLevel?: string
  goalWeight?: number
  startDate?: number
  endDate?: number
  pfc?: number
}

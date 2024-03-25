import { type Timestamp } from 'firebase/firestore'

export interface UserInfo {
  userName?: string
  height?: string
  weight?: string
  birthday?: Timestamp
  gender?: string
  activeLevel?: string
  basalMetabo?: number
  totalConsumed?: number
  goalWeight?: string
  startDate?: Timestamp
  endDate?: Timestamp
  pfc?: string
  goalKcal?: number
}

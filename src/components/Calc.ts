import { type Timestamp } from 'firebase/firestore'

export const calcKcal = (total: string, value: number): number => {
  const kcal = Math.round(Number(total) * (value * 0.01))
  return kcal
}

export const calcProteinGram = (total: string, value: number): number => {
  const kcal = Math.round(Number(total) * (value * 0.01))
  const gram = Math.round(kcal / 4)
  return gram
}

export const calcFatGram = (total: string, value: number): number => {
  const kcal = Math.round(Number(total) * (value * 0.01))
  const gram = Math.round(kcal / 9)
  return gram
}

export const calcCarboGram = (total: string, value: number): number => {
  const kcal = Math.round(Number(total) * (value * 0.01))
  const gram = Math.round(kcal / 4)
  return gram
}

export const calcAge = (birthdayTimeStamp: Timestamp): number => {
  const birthday = birthdayTimeStamp.toDate()
  const today = new Date()
  const thisYearsBirthDay = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
  let age = today.getFullYear() - birthday.getFullYear()
  if (today < thisYearsBirthDay) {
    age--
  }
  return age
}

export const calcGender = (gender: string): string => {
  if (gender === '1') {
    return '女性'
  } else if (gender === '2') {
    return '男性'
  } else {
    return 'その他'
  }
}

export const calcActiveLevel = (activeLevel: string | undefined): string => {
  if (activeLevel === '1.2') {
    return '低(ほとんど運動しない)'
  } else if (activeLevel === '1.5') {
    return '中(週2~3回程度の軽い運動)'
  } else if (activeLevel === '1.7') {
    return '高(週4~6回程度の激しい運動)'
  } else {
    return '未設定'
  }
}

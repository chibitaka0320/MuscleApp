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
    return 'ほとんど運動しない'
  } else if (activeLevel === '1.375') {
    return '軽い運動'
  } else if (activeLevel === '1.55') {
    return '中程度の運動'
  } else if (activeLevel === '1.725') {
    return '激しい運動'
  } else if (activeLevel === '1.9') {
    return '非常に激しい運動'
  } else {
    return '未設定'
  }
}

export const calcBasalMetabo = (
  height: string,
  weight: string,
  birthday: Timestamp,
  gender: string): number => {
  if (height !== '' && weight !== '' && birthday != null && gender !== '') {
    if (gender === '1') {
      const metabo = Math.round(9.247 * Number(weight) + 3.098 * Number(height) - 4.33 * calcAge(birthday) + 447.593)
      return metabo
    } else if (gender === '2') {
      const metabo = Math.round(13.397 * Number(weight) + 4.799 * Number(height) - 5.677 * calcAge(birthday) + 88.362)
      return metabo
    } else if (gender === '3') {
      const metabo = Math.round(11 * Number(weight) + 4 * Number(height) - 5 * calcAge(birthday) + 270)
      return metabo
    } else {
      return 0
    }
  }
  return 0
}

export const calcTotalConsumed = (
  basalMetabo: number,
  activeLevel: string): number => {
  if (basalMetabo !== 0 && activeLevel !== '') {
    return Math.round(basalMetabo * Number(activeLevel))
  }
  return 0
}

export const calcGoalKcal = (
  totalConsumed: number,
  startDate: Date,
  endDate: Date,
  weight: string,
  goalWeight: string
): number => {
  if (
    totalConsumed !== 0 &&
    !Number.isNaN(startDate.valueOf()) &&
    !Number.isNaN(endDate.valueOf()) &&
    weight !== '' &&
    goalWeight !== ''
  ) {
    const termDay = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)
    console.log(termDay)
    const termWeight = Number(weight) - Number(goalWeight)
    const termKcal = Math.round(termWeight * 7200 / termDay)
    const goalKcal = Number(totalConsumed) - termKcal
    return goalKcal
  }
  return 0
}

export const formDate = (date: Date): string => {
  if (!Number.isNaN(date.valueOf())) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
  }
  return ''
}

export const pfcTitle = (pfc: string): string => {
  if (pfc === '1') {
    return 'クリーン'
  } else if (pfc === '2') {
    return 'ロカボ'
  } else if (pfc === '3') {
    return 'バルク'
  }
  return '未設定'
}

export const pfcPercent = (pfc: string): string => {
  if (pfc === '1') {
    return 'P:40%  F:20%  C:40%'
  } else if (pfc === '2') {
    return 'P:30%  F:20%  C:50%'
  } else if (pfc === '3') {
    return 'P:55%  F:25%  C:20%'
  }
  return ''
}

export const getNow = (): string => {
  const today = new Date()
  const year = today.getFullYear().toString()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const formattedDay = (): string => {
    if (day < 10) {
      const st = `0${day}`
      return st
    }
    return day.toString()
  }
  const formattedMonth = (): string => {
    if (month < 10) {
      const st = `0${month}`
      return st
    }
    return month.toString()
  }
  const formattedDate = `${year}-${formattedMonth()}-${formattedDay()}`
  return formattedDate
}

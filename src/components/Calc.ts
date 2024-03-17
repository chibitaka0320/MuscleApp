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

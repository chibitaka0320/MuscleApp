export interface EatingData {
  id: string
  name: string
  total: string
  protein: number
  fat: number
  carbo: number
}

export interface EatingSumData {
  total: number
  protein: number
  fat: number
  carbo: number
}

export interface EatingGoalPFC {
  goalProtein: number
  goalFat: number
  goalCarbo: number
}

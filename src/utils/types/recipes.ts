interface BreakdownValues {
  percent: number
  value: number
}

interface Nutrient {
  name: string
  amount: number
  unit: string
  percentOfDailyNeeds: number
}

export interface Ingredient {
  id: number
  name: string
  image: string
  units: {
    base: string
    short: string
    long: string
  }
  amount: number
  possibleUnits: string[]
  nutrition: Nutrient[]
  caloricBreakdown: {
    calories: BreakdownValues
    protein: BreakdownValues
    fat: BreakdownValues
    carb: BreakdownValues
  }
  estimatedCost: number
  asile: string[]
}

interface User {
  _id: string
  email: string
  firstName: string
}

interface Category {
  _id: string
  label: string
}

export interface RecipeType {
  _id: string
  user: User
  title: string
  ingredients: Ingredient[]
  macros: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  totalEstimatedCost: number
  instructions: string[]
  cookingMethod: string
  allergies: string[]
  category: Category
  difficulty: number
  tags: string[]
  image: {
    src: null | string
    publicId: null | string
  }
  prepTime: number
  cookTime: number
  totalTime: number
  createdAt: Date
  updatedAt: Date
}

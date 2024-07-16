import { createSlice } from '@reduxjs/toolkit'

export const COZY = 'Cozy'
export const COMPACT = 'Compact'
export const GRID = 'Grid'

export const initialState = {
  all: [] as any,
  user: [] as any,
  filtered: [],
  userFilters: {},
  allFilters: {},
  layout: COZY,
  loading: false,
  recap: {
    _id: '6613e41d80506d06c9d7b5e4',
    user: {
      _id: '65edfea1c0426d0179db3328',
      email: 'arfusop.dev@gmail.com',
      firstName: 'Phil'
    },
    title: 'glazed apples w cinnamon',
    servings: 12,
    macros: {
      calories: 54,
      protein: 106.16,
      carbs: 0,
      fat: 12.94
    },
    totalEstimatedCost: 4.44,
    instructions: ['slice fruit', 'sautee'],
    cookingMethod: 'Roast',
    allergies: [],
    category: {
      _id: '65ee01e4ebe8f3de4aabe025',
      label: 'Lunch'
    },
    difficulty: 2,
    tags: ['health', 'fruit', 'yum'],
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    author: {
      name: null,
      authorId: null,
      rating: null,
      difficulty: null
    },
    interactions: {
      ratings: [],
      comments: []
    },
    createdAt: 1712579613176,
    updatedAt: 1712579613158
  }
}

export const recipesSlice = createSlice({
  name: 'recipesSlice',
  initialState,
  reducers: {
    setLoadingRecipes: (state, action) => {
      state.loading = action.payload
    },
    setAllRecipes: (state, action) => {
      state.all = action.payload
    },
    setUserRecipes: (state, action) => {
      state.user = action.payload
    },
    addNewRecipe: (state, action) => {
      const updatedAllRecipes = [action.payload, ...state.all]
      const updatedUserRecipes = [action.payload, ...state.user]
      state.all = updatedAllRecipes
      state.user = updatedUserRecipes
      state.recap = action.payload
    },
    setFilteredResults: (state, action) => {
      state.filtered = action.payload
    },
    clearFilters: state => {
      state.filtered = []
    },
    setLayout: (state, action) => {
      state.layout = action.payload
    },
    setUserFilters: (state, action) => {
      state.userFilters = action.payload
    },
    setAllFilters: (state, action) => {
      state.allFilters = action.payload
    }
  }
})

export const {
  addNewRecipe,
  clearFilters,
  setAllFilters,
  setAllRecipes,
  setFilteredResults,
  setLayout,
  setLoadingRecipes,
  setUserFilters,
  setUserRecipes
} = recipesSlice.actions
export default recipesSlice.reducer

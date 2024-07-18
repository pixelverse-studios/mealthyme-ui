import { createSlice } from '@reduxjs/toolkit'

export const COZY = 'Cozy'
export const COMPACT = 'Compact'
export const GRID = 'Grid'

export const initialState = {
  all: null as any,
  user: null as any,
  filtered: [],
  userFilters: {},
  allFilters: {},
  layout: COZY,
  loading: false,
  recap: {}
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

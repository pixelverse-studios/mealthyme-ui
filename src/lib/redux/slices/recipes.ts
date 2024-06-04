import { createSlice } from '@reduxjs/toolkit'

export const COZY = 'Cozy'
export const COMPACT = 'Compact'
export const GRID = 'Grid'

export const initialState = {
  all: [],
  user: [],
  filtered: [],
  userFilters: {},
  allFilters: {},
  layout: COZY,
  loading: false
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
  clearFilters,
  setAllRecipes,
  setFilteredResults,
  setLayout,
  setLoadingRecipes,
  setUserRecipes,
  setUserFilters,
  setAllFilters
} = recipesSlice.actions
export default recipesSlice.reducer

import { configureStore } from '@reduxjs/toolkit'

import recipesSlice from './slices/recipes'

export const store = configureStore({
  reducer: {
    recipes: recipesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

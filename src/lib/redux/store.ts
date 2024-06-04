import { configureStore } from '@reduxjs/toolkit'

import userSlice from './slices/user'
import navSlice from './slices/nav'
import recipesSlice from './slices/recipes'

export const store = configureStore({
  reducer: {
    user: userSlice,
    nav: navSlice,
    recipes: recipesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

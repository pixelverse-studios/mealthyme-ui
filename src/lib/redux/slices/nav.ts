import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
  name: 'navSlice',
  initialState: { isMobile: false as boolean, showMobile: false as boolean },
  reducers: {
    setShowMobile: (state, action) => {
      state.showMobile = action.payload
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
    }
  }
})

export const { setShowMobile, setIsMobile } = navSlice.actions
export default navSlice.reducer

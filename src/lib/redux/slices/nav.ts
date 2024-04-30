import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'

export const toggleDestroy = (dispatch: AppDispatch) => {
  dispatch(toggleDestroyNav(true))
  setTimeout(() => dispatch(toggleDestroyNav(false)), 1000)
}

export const navSlice = createSlice({
  name: 'navSlice',
  initialState: {
    isMobile: false as boolean,
    showMobile: false as boolean,
    destroy: false as boolean
  },
  reducers: {
    setShowMobile: (state, action) => {
      state.showMobile = action.payload
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
    },
    toggleDestroyNav: (state, action) => {
      state.destroy = action.payload
    }
  }
})

export const { setShowMobile, setIsMobile, toggleDestroyNav } = navSlice.actions
export default navSlice.reducer

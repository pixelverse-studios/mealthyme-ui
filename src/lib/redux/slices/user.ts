import { createSlice } from '@reduxjs/toolkit'

import { ProfileProps } from '@/utils/types/user'
import { USER_TOKEN } from '@/utils/constants'
import { AppDispatch } from '../store'

export const logout = (dispatch: AppDispatch, router: any) => {
  dispatch(removeProfile())
  router.push('/')
  localStorage.removeItem(USER_TOKEN)
}

export const initialState = {
  profile: {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    providerId: '',
    lastLogin: null,
    newUser: false,
    tier: ''
  } as ProfileProps,
  loading: false as boolean,
  loggedIn: false as boolean
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.loading = false
      state.profile = action.payload
      state.loggedIn = action.payload?._id !== '' || action.payload !== null
    },
    setProfileLoading: (state, action) => {
      state.loading = action.payload
    },
    removeProfile: state => {
      state.profile = initialState.profile
      state.loggedIn = false
    }
  }
})

export const { setProfileLoading, setProfile, removeProfile } =
  userSlice.actions
export default userSlice.reducer

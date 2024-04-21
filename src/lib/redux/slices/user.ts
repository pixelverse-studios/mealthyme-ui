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
    tier: '',
    createdAt: new Date(),
    updatedAt: new Date()
  } as ProfileProps,
  loading: false as boolean
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.loading = false
      state.profile = action.payload
    },
    setProfileLoading: (state, action) => {
      state.loading = action.payload
    },
    removeProfile: state => {
      state.profile = initialState.profile
    }
  }
})

export const { setProfileLoading, setProfile, removeProfile } =
  userSlice.actions
export default userSlice.reducer

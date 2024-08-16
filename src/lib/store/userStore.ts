import { create } from 'zustand'

const initialState = {
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
  },
  loading: false,
  loggedIn: false
}

type Profile = {
  _id: string
  email: string
  firstName: string
  lastName: string
  avatar: string | null
  providerId: string
  lastLogin: Date | null
  newUser: boolean
  tier: string
}

type State = {
  profile: any
  loading: boolean
  loggedIn: boolean
}

type Actions = {
  setProfile: (profile: Profile) => void
  setProfileLoading: (loading: boolean) => void
  removeProfile: () => void
}

const useUserStore = create<State & Actions>(set => ({
  ...initialState,
  setProfile: profile =>
    set(() => ({
      loading: false,
      profile: profile,
      loggedIn: true
    })),
  setProfileLoading: loading => set(state => ({ ...state, loading })),
  removeProfile: () => set(state => ({ ...state, profile: initialState }))
}))

export default useUserStore

import { create } from 'zustand'

type State = {
  isMobile: boolean
  showMobile: boolean
  destroy: boolean
}

type Actions = {
  toggleMobile: (status: boolean) => void
  setShowMobile: (status: boolean) => void
  toggleDestroyNav: () => void
}

const useNavStore = create<State & Actions>(set => ({
  isMobile: false,
  toggleMobile: isMobile => set(state => ({ ...state, isMobile })),
  showMobile: false,
  setShowMobile: showMobile => set(state => ({ ...state, showMobile })),
  destroy: false,
  toggleDestroyNav: () => {
    set(state => ({ ...state, destroy: true }))
    setTimeout(() => set(state => ({ ...state, destroy: false })), 1000)
  }
}))

export default useNavStore

import { create } from 'zustand'

type State = {
  isMobile: boolean
  showNav: boolean
  destroy: boolean
}

type Actions = {
  toggleMobile: (status: boolean) => void
  setShowNav: (status: boolean) => void
  toggleDestroyNav: () => void
}

const useNavStore = create<State & Actions>(set => ({
  isMobile: false,
  toggleMobile: isMobile => set(state => ({ ...state, isMobile })),
  showNav: false,
  setShowNav: showNav => set(state => ({ ...state, showNav })),
  destroy: false,
  toggleDestroyNav: () => {
    set(state => ({ ...state, destroy: true }))
    setTimeout(() => set(state => ({ ...state, destroy: false })), 1000)
  }
}))

export default useNavStore

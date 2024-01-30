'use client'
import { signInWithPopup, signOut, getAuth } from 'firebase/auth'
import { authProvider } from '@/lib/auth'

const useAuth = () => {
  const auth = getAuth()

  const handleSignIn = async () => {
    try {
        // TODO: Come back and update this once we have a working backend
      console.log('clicked to sign in')
      //   dispatch(setProfileLoading(true))
      const { user: gUser } = await signInWithPopup(auth, authProvider)
      console.log(gUser)
      //   const { email, photoURL, displayName, providerId } = gUser.providerData[0]
      //   await signIn({
      //     variables: { email, avatar: photoURL, displayName, providerId }
      //   })
      //   setTimeout(() => router.push('/profile'), 1000)
    } catch (error) {
      console.log(error)
      //   dispatch(setProfileLoading(false))
      //   snackbar(messages[statuses.ERROR].loggedIn, {
      //     variant: statuses.ERROR
      //   })
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      //   clearLocalStorageItem(USER_TOKEN)
      //   dispatch(removeProfile())
    } catch (error) {
      // TODO: add error handling
    }
  }

  return { handleSignIn, handleLogout }
}

export default useAuth

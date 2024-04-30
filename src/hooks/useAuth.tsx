'use client'
import { useDispatch } from 'react-redux'
import { signInWithPopup, signOut, getAuth } from 'firebase/auth'
import { useMutation } from '@apollo/client'
import { SIGN_IN } from '@/lib/gql/mutations/user'
import {
  setProfileLoading,
  setProfile,
  removeProfile
} from '@/lib/redux/slices/user'
import { USER_TOKEN } from '@/utils/constants'
import {
  setLocalStorageItem,
  clearLocalStorageItem
} from '@/utils/localStorage'
import { authProvider } from '@/lib/auth'
import Banner from '@/components/banner'

const useAuth = (router: any) => {
  const auth = getAuth()
  const dispatch = useDispatch()

  const [signIn] = useMutation(SIGN_IN, {
    onCompleted({ signIn: data }) {
      if (data.__typename === 'Errors') {
        return Banner.Error(data.message)
      } else {
        dispatch(setProfile(data))
        setLocalStorageItem(USER_TOKEN, data)
        Banner.LoggedIn()
        // TODO: Decide how to handle if user should be routed home, or kept on their current page when logged in
        return router.push('/')
      }
    },
    onError() {
      return Banner.TechDiff()
    }
  })

  const handleGoogleSignIn = async () => {
    dispatch(setProfileLoading(true))
    try {
      const { user: gUser } = await signInWithPopup(auth, authProvider)
      const { email, photoURL, displayName, providerId } = gUser.providerData[0]
      await signIn({
        variables: {
          email,
          avatar: photoURL,
          fullName: displayName,
          providerId
        }
      })
    } catch (error) {
      return Banner.LoggingInError()
    } finally {
      dispatch(setProfileLoading(false))
    }
  }

  const handleGoogleLogOut = async () => {
    try {
      await signOut(auth)
      clearLocalStorageItem(USER_TOKEN)
      dispatch(removeProfile())
      Banner.LoggedOut()
      return router.push('/')
    } catch (error) {
      return Banner.LoggedOutError()
    }
  }

  return { handleGoogleSignIn, handleGoogleLogOut }
}

export default useAuth

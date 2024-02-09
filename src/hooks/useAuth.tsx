'use client'
import { useDispatch } from 'react-redux'
import { signInWithPopup, signOut, getAuth } from 'firebase/auth'
import { useMutation } from '@apollo/client'
import { SIGN_IN } from '@/lib/gql/mutations/user'
import { setProfileLoading, setProfile } from '@/lib/redux/slices/user'
import { USER_TOKEN } from '@/utils/constants'
import { setLocalStorageItem } from '@/utils/localStorage'
import { authProvider } from '@/lib/auth'

const useAuth = () => {
  const auth = getAuth()
  const dispatch = useDispatch()

  const [signIn] = useMutation(SIGN_IN, {
    onCompleted({ signIn: data }) {
      if (data.__typename === 'Errors') {
        // display alert with error message
      } else {
        // display success alert
        dispatch(setProfile(data))
        setLocalStorageItem(USER_TOKEN, data)
      }
    },
    onError() {
      // dispatch alert to snackbar/whatever we do use
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
      //   dispatch(setProfileLoading(false))
      //   snackbar(messages[statuses.ERROR].loggedIn, {
      //     variant: statuses.ERROR
      //   })
    } finally {
      dispatch(setProfileLoading(false))
    }
  }

  const handleGoogleLogOut = async () => {
    try {
      await signOut(auth)
      //   clearLocalStorageItem(USER_TOKEN)
      //   dispatch(removeProfile())
    } catch (error) {
      // TODO: add error handling
    }
  }

  return { handleGoogleSignIn, handleGoogleLogOut }
}

export default useAuth

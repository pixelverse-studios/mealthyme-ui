'use client'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithPopup, signOut, getAuth } from 'firebase/auth'
import { useLazyQuery, useMutation } from '@apollo/client'
import { SIGN_IN } from '@/lib/gql/mutations/user'
import { GET_USER } from '@/lib/gql/queries/user'
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
import { isHandledError } from '@/utils/gql'
import { authProvider } from '@/lib/auth'
import Banner from '@/components/banner'
import { RECIPE_ROUTES } from '@/components/nav/utils'
import hooks from '.'

const useAuth = (router?: any) => {
  const auth = getAuth()
  const dispatch = useDispatch()
  const { user: userRecipes, loading } = useSelector(
    (state: any) => state.recipes
  )
  const { fetchUserRecipes, fetchUserFilters } = hooks.useRecipes()

  const [signIn] = useMutation(SIGN_IN, {
    async onCompleted({ signIn: data }) {
      if (data.__typename === 'Errors') {
        return Banner.Error(data.message)
      } else {
        await fetchUserRecipes(data._id)
        dispatch(setProfile(data))
        setLocalStorageItem(USER_TOKEN, data)
        Banner.LoggedIn()
        // TODO: Decide how to handle if user should be routed home, or kept on their current page when logged in
        return router.push(RECIPE_ROUTES.mine)
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
      return router.push(RECIPE_ROUTES.all)
    } catch (error) {
      return Banner.LoggedOutError()
    }
  }

  const [getUser] = useLazyQuery(GET_USER, {
    async onCompleted({ user }) {
      if (isHandledError(user)) {
        return Banner.Error(user.message)
      } else {
        if (userRecipes.length === 0 && !loading) {
          await fetchUserRecipes(user._id)
        }
        dispatch(setProfile(user))
        Banner.LoggedIn()
      }
    },
    onError() {
      return Banner.TechDiff()
    }
  })
  const fetchUser = async (email: string, id: string) => {
    try {
      fetchUserFilters(id)
      await getUser({ variables: { email } })
    } catch (error) {
      return Banner.LoggingInError()
    }
  }

  return { handleGoogleSignIn, handleGoogleLogOut, fetchUser }
}

export default useAuth

'use client'
import { signInWithPopup, signOut, getAuth } from 'firebase/auth'
import { useLazyQuery, useMutation } from '@apollo/client'
import { SIGN_IN } from '../lib/gql/mutations/user'
import { GET_USER } from '../lib/gql/queries/user'
import { useUserStore, useRecipeStore } from '../lib/store'
import { USER_TOKEN } from '../utils/constants'
import {
  setLocalStorageItem,
  clearLocalStorageItem
} from '../utils/localStorage'
import { isHandledError } from '../utils/gql'
import { authProvider } from '../lib/auth'
import Banner from '../components/banner'
import { RECIPE_ROUTES } from '../components/nav/utils'
import { useRecipes } from '.'

const useAuth = (router: any) => {
  const auth = getAuth()
  const { setProfile, setProfileLoading, removeProfile } = useUserStore()
  const { user: userRecipes, loading } = useRecipeStore()
  const { fetchUserRecipes, fetchUserFilters } = useRecipes()

  const [signIn] = useMutation(SIGN_IN, {
    async onCompleted({ signIn: data }) {
      if (data.__typename === 'Errors') {
        return Banner.Error(data.message)
      } else {
        await fetchUserRecipes(data._id)
        setProfile(data)
        setLocalStorageItem(USER_TOKEN, data)
        Banner.LoggedIn()
        // TODO: Decide how to handle if user should be routed home, or kept on their current page when logged in
        return router.push(RECIPE_ROUTES.all)
      }
    },
    onError() {
      return Banner.TechDiff()
    }
  })

  const handleGoogleSignIn = async () => {
    setProfileLoading(true)
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
      setProfileLoading(false)
    }
  }

  const handleGoogleLogOut = async () => {
    try {
      await signOut(auth)
      clearLocalStorageItem(USER_TOKEN)
      removeProfile()
      Banner.LoggedOut()
      setProfileLoading(false)
      return router.push(RECIPE_ROUTES.all)
    } catch (error) {
      setProfileLoading(false)
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
        setProfile(user)
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

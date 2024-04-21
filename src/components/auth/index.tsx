'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLazyQuery } from '@apollo/client'
import { SnackbarProvider } from 'notistack'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { GET_USER } from '@/lib/gql/queries/user'
import { setProfile, setProfileLoading } from '@/lib/redux/slices/user'
import { getValidatedUser } from '@/lib/auth/utils'
import useAuth from '@/hooks/useAuth'
import Banner from '../banner'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth()
  const router = useRouter()
  const dispatch = useDispatch()
  const { handleGoogleLogOut } = useAuth(router)

  const [getUser] = useLazyQuery(GET_USER, {
    onCompleted({ getUser: data }) {
      if (data.__typename === 'Errors') {
        return Banner.Error(data.message)
      } else {
        dispatch(setProfile(data))
        Banner.LoggedIn()
      }
    },
    onError() {
      return Banner.TechDiff()
    }
  })

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async user => {
      if (user) {
        const { profile, expired } = getValidatedUser(user.email || '')

        if (profile == null) {
          handleGoogleLogOut()
        } else {
          dispatch(setProfileLoading(true))

          if (expired) {
            getUser({ variables: { email: user.email } })
          } else {
            dispatch(setProfile(profile))
          }
        }
      }
    })

    return () => listen()
  }, [auth, dispatch, getUser, handleGoogleLogOut])
  return (
    <>
      {children}
      <SnackbarProvider hideIconVariant />
    </>
  )
}

export default AuthWrapper

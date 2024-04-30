'use client'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLazyQuery } from '@apollo/client'
import { SnackbarProvider } from 'notistack'
import { useDispatch } from 'react-redux'
import { GET_USER } from '@/lib/gql/queries/user'
import { setProfile, setProfileLoading } from '@/lib/redux/slices/user'
import { getValidatedUser } from '@/lib/auth/utils'
import Banner from '../banner'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const { loading, profile } = useSelector((state: any) => state.user)

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
    if (!loading && profile?._id == '') {
      const { profile, expired } = getValidatedUser()
      dispatch(setProfileLoading(true))
      if (expired) {
        getUser({ variables: { email: profile?.email } })
      } else {
        dispatch(setProfile(profile))
        dispatch(setProfileLoading(false))
      }
    }
  }, [dispatch, getUser, loading, profile])

  return (
    <>
      {children}
      <SnackbarProvider hideIconVariant />
    </>
  )
}

export default AuthWrapper

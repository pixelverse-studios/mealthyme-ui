'use client'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { useDispatch } from 'react-redux'
import { setProfile, setProfileLoading } from '@/lib/redux/slices/user'
import { getValidatedUser } from '@/lib/auth/utils'
import hooks from '@/hooks'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const { loading, profile } = useSelector((state: any) => state.user)
  const { loading: recipeLoading, all } = useSelector(
    (state: any) => state.recipes
  )
  const {
    fetchAllFilters,
    fetchAllRecipes,
    fetchUserFilters,
    fetchUserRecipes
  } = hooks.useRecipes()
  const { fetchUser } = hooks.useAuth()

  useEffect(() => {
    if (!loading && profile?._id == '') {
      const { profile, expired } = getValidatedUser()
      dispatch(setProfileLoading(true))
      if (expired) {
        fetchUser(profile?.email ?? '', profile?._id ?? '')
      } else {
        fetchUserRecipes(profile?._id ?? '').then(() => {
          fetchUserFilters(profile?._id ?? '')
          dispatch(setProfile(profile))
          dispatch(setProfileLoading(false))
        })
      }
    }
  }, [
    dispatch,
    fetchUser,
    fetchUserFilters,
    fetchUserRecipes,
    loading,
    profile
  ])

  useEffect(() => {
    if (!recipeLoading && all?.length === 0) {
      fetchAllFilters()
      fetchAllRecipes()
    }
  }, [all, dispatch, fetchAllFilters, fetchAllRecipes, recipeLoading])

  return (
    <>
      {children}
      <SnackbarProvider hideIconVariant autoHideDuration={5000} />
    </>
  )
}

export default AuthWrapper

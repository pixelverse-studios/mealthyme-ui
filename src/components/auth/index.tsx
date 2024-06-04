'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { useDispatch } from 'react-redux'
import { setProfile, setProfileLoading } from '@/lib/redux/slices/user'
import { getValidatedUser } from '@/lib/auth/utils'
import hooks from '@/hooks'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, loggedIn } = useSelector((state: any) => state.user)
  const { loading: recipeLoading, all } = useSelector(
    (state: any) => state.recipes
  )
  const {
    fetchAllFilters,
    fetchAllRecipes,
    fetchUserFilters,
    fetchUserRecipes
  } = hooks.useRecipes()
  const { handleGoogleLogOut } = hooks.useAuth(router)

  const { profile: validated, expired } = getValidatedUser()
  useEffect(() => {
    if (!loading && !loggedIn) {
      if (expired) {
        dispatch(setProfileLoading(true))
        handleGoogleLogOut()
      } else if (validated?._id !== undefined && validated?._id !== '') {
        dispatch(setProfileLoading(true))
        fetchUserRecipes(validated?._id ?? '').then(() => {
          fetchUserFilters(validated?._id ?? '')
          dispatch(setProfile(validated))
          dispatch(setProfileLoading(false))
        })
      }
    }
  }, [
    dispatch,
    expired,
    fetchUserFilters,
    fetchUserRecipes,
    handleGoogleLogOut,
    loading,
    loggedIn,
    validated
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

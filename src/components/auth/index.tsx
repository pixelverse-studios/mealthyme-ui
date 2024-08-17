'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SnackbarProvider } from 'notistack'

import { useUserStore, useRecipeStore } from '../../lib/store'
import { getValidatedUser } from '../../lib/auth/utils'
import { useRecipes, useAuth } from '../../hooks'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { loading, loggedIn, setProfileLoading, setProfile } = useUserStore()
  const { loading: recipeLoading, all } = useRecipeStore()
  const {
    fetchAllFilters,
    fetchAllRecipes,
    fetchUserFilters,
    fetchUserRecipes
  } = useRecipes()
  const { handleGoogleLogOut } = useAuth(router)

  const { profile: validated, expired } = getValidatedUser()

  useEffect(() => {
    const element = document?.querySelector('html')
    if (element != null) element.setAttribute('data-theme', 'LIGHT')
  }, [])

  useEffect(() => {
    if (!loading && !loggedIn) {
      if (expired) {
        setProfileLoading(true)
        handleGoogleLogOut()
      } else if (validated?._id !== undefined && validated?._id !== '') {
        setProfileLoading(true)
        fetchUserRecipes(validated?._id ?? '').then(() => {
          fetchUserFilters(validated?._id ?? '')
          setProfile(validated)
          setProfileLoading(false)
        })
      }
    }
  }, [
    expired,
    fetchUserFilters,
    fetchUserRecipes,
    handleGoogleLogOut,
    loading,
    loggedIn,
    setProfile,
    setProfileLoading,
    validated
  ])

  useEffect(() => {
    if (!recipeLoading && all === null) {
      fetchAllFilters()
      fetchAllRecipes()
    }
  }, [all, fetchAllFilters, fetchAllRecipes, recipeLoading])

  return (
    <>
      {children}
      <SnackbarProvider hideIconVariant autoHideDuration={5000} />
    </>
  )
}

export default AuthWrapper

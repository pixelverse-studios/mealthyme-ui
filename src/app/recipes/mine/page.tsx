'use client'
import { useRecipeStore } from '../../../lib/store'
import RecipeFeed from '../components/feed'

export default function MyRecipes() {
  const { user, loading } = useRecipeStore()
  return <RecipeFeed canDelete recipes={user} loading={loading} />
}

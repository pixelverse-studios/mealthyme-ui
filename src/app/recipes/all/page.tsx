'use client'
import { useRecipeStore } from '../../../lib/store'
import RecipeFeed from '../components/feed'

export default function AllRecipes() {
  const { all, loading } = useRecipeStore()
  return <RecipeFeed recipes={all} loading={loading} />
}

'use client'
import { useSelector } from 'react-redux'
import RecipeFeed from '../components/feed'

export default function MyRecipes() {
  const { user, loading } = useSelector((state: any) => state.recipes)
  return <RecipeFeed recipes={user} loading={loading} />
}

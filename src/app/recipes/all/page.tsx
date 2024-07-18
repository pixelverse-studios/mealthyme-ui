'use client'
import { useSelector } from 'react-redux'
import RecipeFeed from '../components/feed'

export default function AllRecipes() {
  const { all, loading } = useSelector((state: any) => state.recipes)
  return <RecipeFeed recipes={all} loading={loading} />
}

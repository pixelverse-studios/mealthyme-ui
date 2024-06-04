'use client'
import RecipeForm from '@/components/recipes/form'

export default function CreateRecipe() {
  return (
    <div>
      New Recipe
      <RecipeForm isEdit={false} />
    </div>
  )
}

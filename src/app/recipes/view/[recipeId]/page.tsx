'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'

import { GET_RECIPE_BY_ID } from '../../../../lib/gql/queries/recipes'
import RecipeView from '../../../../components/recipes/view'

export default function ViewRecipe() {
  const params = useParams()

  const { loading, error, data } = useQuery(GET_RECIPE_BY_ID, {
    variables: { recipeId: params.recipeId }
  })

  if (loading) return <span>Loading...</span>
  if (error) return `Error ${error}`

  return <RecipeView recipe={data.recipe} />
}

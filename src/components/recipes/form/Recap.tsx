'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@mantine/core'

import { useRecipeStore } from '../../../lib/store'
import { RECIPE_ROUTES } from '../../nav/utils'
import styles from './RecipeForm.module.scss'

const RecipeRecap = () => {
  const { recap } = useRecipeStore()
  const router = useRouter()

  const onGoToFeed = () => router.push(RECIPE_ROUTES.mine)

  const onGoToCreate = () => router.push('/recipes/new')

  return (
    <section className={styles.recipeRecap}>
      <h2>{recap.title} has been created!</h2>
      <h4>Some stats for the nerds:</h4>
      <div className={styles.actions}>
        <Button color="primary" onClick={onGoToCreate}>
          Create another recipe
        </Button>
        <Button color="secondary" onClick={onGoToFeed}>
          Back to my feed
        </Button>
      </div>
    </section>
  )
}

export default RecipeRecap

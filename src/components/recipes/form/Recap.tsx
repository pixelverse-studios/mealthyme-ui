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
      <div className={styles.actions}>
        <Button variant="light" color="green" onClick={onGoToCreate}>
          Create another recipe
        </Button>
        <Button variant="light" color="blue" onClick={onGoToFeed}>
          Back to my feed
        </Button>
      </div>
    </section>
  )
}

export default RecipeRecap

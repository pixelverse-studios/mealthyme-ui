import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AddPhotoAlternate, PeopleAlt, AccessTime } from '@mui/icons-material'
import { FaTrashCan } from 'react-icons/fa6'
import { ActionIcon } from '@mantine/core'
import { useMutation } from '@apollo/client'

import { useRecipeStore } from '../../../lib/store'
import { RecipeType } from '../../../utils/types/recipes'
import { DELETE_RECIPE } from '../../../lib/gql/mutations/recipes'
import Banner from '../../banner'
import NumberUtils from '../../../utils/numbers'
import Rating from '../rating'
import { RECIPE_ROUTES } from '../../nav/utils'
import styles from './RecipeView.module.scss'

const RecipeView = ({ recipe }: { recipe: RecipeType }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const { removeDeletedRecipe } = useRecipeStore()

  const {
    _id,
    title,
    allergies,
    category,
    cookTime,
    cookingMethod,
    difficulty,
    image,
    ingredients,
    instructions,
    macros,
    prepTime,
    servings,
    tags,
    totalTime
  } = recipe

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    onCompleted() {
      removeDeletedRecipe(_id)
      setLoading(false)
      return router.push(RECIPE_ROUTES.mine)
    },
    onError() {
      return Banner.Error('There was an issue deleting your recipe.')
    }
  })

  const onDeleteClick = async () => {
    setLoading(true)
    deleteRecipe({ variables: { id: _id } })
  }

  return (
    <section className={styles.RecipeView}>
      <header>
        <div className={styles.title}>
          <h1>{title}</h1>
          <h2>{category.label}</h2>
        </div>
        <div className={styles.actions}>
          <ActionIcon
            aria-label="Delete Recipe"
            color="tomato"
            loading={loading}
            onClick={onDeleteClick}
            radius="md"
            variant="subtle">
            <FaTrashCan />
          </ActionIcon>
        </div>
      </header>
      <div className={styles.recipeInfo}>
        <div className={styles.details}>
          <div className={styles.infoBlock}>
            {image.src ? (
              <img src={image.src ?? ''} alt="recipe_image" />
            ) : (
              <div className={styles.nonImg}>
                <AddPhotoAlternate />
              </div>
            )}
          </div>
          <div className={styles.infoBlock}>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map(ingredient => (
                <li key={ingredient.name}>
                  {ingredient.amount} {ingredient.units.short}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.infoBlock}>
            <h3>Instructions</h3>
            <ol>
              {instructions.map(instruction => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.infoBlock}>
            <div className={styles.macros}>
              <div>
                <span>{NumberUtils.handleRoundNumber(macros.calories)}g</span>
                <span>Calories</span>
              </div>
              <div>
                <span>{NumberUtils.handleRoundNumber(macros.carbs)}g</span>
                <span>Carbs</span>
              </div>
              <div>
                <span>{NumberUtils.handleRoundNumber(macros.protein)}g</span>
                <span>Protein</span>
              </div>
              <div>
                <span>{NumberUtils.handleRoundNumber(macros.fat)}g</span>
                <span>Fat</span>
              </div>
            </div>
          </div>
          <div className={styles.infoBlock}>
            <h3>Times</h3>
            <div className={styles.timings}>
              <AccessTime />
              <p>
                Total <span>{totalTime}</span>
              </p>
              <p>
                Prep <span>{prepTime}</span>
              </p>
              <p>
                Cook <span>{cookTime}</span>
              </p>
            </div>
          </div>
          <div className={styles.infoBlock}>
            <p>Cooking method: {cookingMethod}</p>
            <p>
              <PeopleAlt /> {servings}
            </p>
            <Rating value={difficulty} />
          </div>

          <div className={styles.infoBlock}>
            {allergies.length > 0 ? (
              <>
                <h3>Allergies</h3>
                {allergies.map(allergy => (
                  <span key={allergy}>{allergy}</span>
                ))}
              </>
            ) : (
              <p>No allergies</p>
            )}
          </div>
          <div className={styles.infoBlock}>
            {tags.length > 0 ? (
              <>
                <h3>Tags</h3>
                {allergies.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </>
            ) : (
              <p>No tags</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecipeView

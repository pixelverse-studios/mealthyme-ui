import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FaUpload, FaPeopleGroup, FaClock, FaArrowRight } from 'react-icons/fa6'

import { FaTrashCan } from 'react-icons/fa6'
import { ActionIcon } from '@mantine/core'
import { useMutation } from '@apollo/client'

import { useRecipeStore, useUserStore } from '../../../lib/store'
import { RecipeType } from '../../../utils/types/recipes'
import { DELETE_RECIPE } from '../../../lib/gql/mutations/recipes'
import Banner from '../../banner'
import NumberUtils from '../../../utils/numbers'
import Rating from '../rating'
import { RECIPE_ROUTES } from '../../nav/utils'
import MacroDisplay from './MacroDisplay'
import styles from './RecipeView.module.scss'

const RecipeView = ({ recipe }: { recipe: RecipeType }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const { removeDeletedRecipe } = useRecipeStore()
  const { profile, loggedIn } = useUserStore()

  const {
    _id,
    title,
    allergies,
    category,
    cookTime,
    difficulty,
    image,
    ingredients,
    instructions,
    macros,
    prepTime,
    servings,
    tags,
    totalTime,
    user
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

  const canDelete = useMemo(() => {
    if (!loggedIn) return false
    if (user._id !== profile._id) return false

    return true
  }, [loggedIn, profile._id, user._id])

  return (
    <section className={styles.RecipeView}>
      <header>
        <div className={styles.title}>
          <h1>{title}</h1>
          <h2>{category.label}</h2>
        </div>
        {canDelete ? (
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
        ) : null}
      </header>
      <div className={styles.recipeInfo}>
        <div className={styles.details}>
          <div className={styles.infoBlock}>
            {image.src ? (
              <img src={image.src ?? ''} alt="recipe_image" />
            ) : (
              <div className={styles.nonImg}>
                <FaUpload />
              </div>
            )}
          </div>
          <div className={`${styles.infoBlock} ${styles.doubleRow}`}>
            <div className={styles.flatRow}>
              <p className={styles.servings}>
                Serves: <span>{servings}</span>
              </p>
              <Rating value={difficulty} />
            </div>
            <div className={styles.timings}>
              <p>
                Prep <span>{prepTime}</span>
              </p>
              <p>
                Cook <span>{cookTime}</span>
              </p>
              <p>
                Total <span>{totalTime}</span>
              </p>
            </div>
          </div>
          <div className={styles.infoBlock}>
            <h3>Nutrition facts (per serving)</h3>
            <div className={styles.macros}>
              <MacroDisplay
                label="Calories"
                value={macros.calories}
                servings={servings}
              />
              <MacroDisplay
                label="Protein"
                value={macros.protein}
                servings={servings}
              />
              <MacroDisplay
                label="Carbs"
                value={macros.carbs}
                servings={servings}
              />
              <MacroDisplay
                label="Fat"
                value={macros.fat}
                servings={servings}
              />
            </div>
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
        <div className={styles.details}>
          <div className={styles.infoBlock}>
            <h3>Ingredients</h3>
            <ul className={styles.ingredients}>
              {ingredients.map(ingredient => (
                <li key={ingredient.name}>
                  <span className={styles.amounts}>
                    {ingredient.amount} {ingredient.units.short}
                  </span>
                  <span className={styles.ingredient}>{ingredient.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.infoBlock}>
            <h3>Directions</h3>
            <ul className={styles.instructions}>
              {instructions.map((instruction, index) => (
                <li key={instruction}>
                  <div className={styles.step}>{index + 1}</div>
                  <span className={styles.instruction}>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecipeView

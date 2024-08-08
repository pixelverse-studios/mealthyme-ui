import { AddPhotoAlternate, PeopleAlt, AccessTime } from '@mui/icons-material'

import { RecipeType } from '../../../utils/types/recipes'
import NumberUtils from '../../../utils/numbers'
import Rating from '../rating'
import styles from './RecipeView.module.scss'

const RecipeView = ({ recipe }: { recipe: RecipeType }) => {
  const {
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

  return (
    <section className={styles.RecipeView}>
      <div>
        <h1>{title}</h1>
        <h2>{category.label}</h2>
      </div>
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
              <p>
                <span>{NumberUtils.handleRoundNumber(macros.calories)}g</span>
                <span>Calories</span>
              </p>
              <p>
                <span>{NumberUtils.handleRoundNumber(macros.carbs)}g</span>
                <span>Carbs</span>
              </p>
              <p>
                <span>{NumberUtils.handleRoundNumber(macros.protein)}g</span>
                <span>Protein</span>
              </p>
              <p>
                <span>{NumberUtils.handleRoundNumber(macros.fat)}g</span>
                <span>Fat</span>
              </p>
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

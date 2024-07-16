import { Whatshot } from '@mui/icons-material'

import { RatingField } from '../../../../components/fields'
import { RecipeType } from '../../../../utils/types/recipes'
import styles from './Feed.module.scss'

const recipeFallbackImg =
  'https://res.cloudinary.com/mealthyme/image/upload/mealthyme/placeholders/recipe_placeholder_yszhtf.jpg'

const FeedItem = ({
  recipe: {
    title,
    category,
    image,
    difficulty,
    macros: { protein, carbs, fat, calories },
    tags,
    user,
    prepTime,
    cookTime,
    totalTime,
    totalEstimatedCost
  }
}: {
  recipe: RecipeType
}) => {
  return (
    <div className={styles.FeedItem}>
      <div className={styles.topPanel}>
        <div className={styles.title}>
          <h2>{title}</h2>
          <h3>{category.label}</h3>
        </div>
        <img
          src={image.src === null ? recipeFallbackImg : image.src ?? ''}
          alt={`${title} image`}
        />
      </div>
      <div className={styles.infoPanel}>
        <div className={styles.ratings}>
          <RatingField
            field={{
              value: difficulty?.toString(),
              msgType: '',
              valid: true,
              message: ''
            }}
            id="difficulty"
            label=""
            onChange={() => null}
            icon={<Whatshot />}
            emptyIcon={<Whatshot />}
          />
        </div>
        <div>
          {protein} {carbs} {fat} {calories}
        </div>
        <div>
          {tags.map(tag => (
            <span key={tag}>{tag},</span>
          ))}
        </div>
        <div>
          Prep: {prepTime}
          Cook: {cookTime}
          Total: {totalTime}
        </div>
        <div>{totalEstimatedCost}</div>
        <div>{user.email}</div>
      </div>
    </div>
  )
}

export default FeedItem

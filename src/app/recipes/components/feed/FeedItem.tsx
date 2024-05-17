import Image from 'next/image'
import { Rating } from '@mui/material'
import { Place, PlaceOutlined } from '@mui/icons-material'

import { RecipeType } from '@/utils/types/recipes'
import recipeFallbackImg from '@/assets/recipe_placeholder.jpg'
import styles from './Feed.module.scss'

// title, image (not too much image), rating, difficulty, prep/cook/total time, ingredient count, user, macros,category

const FeedItem = ({
  recipe: {
    title,
    category,
    image,
    rating,
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
        <Image
          src={image === '' ? recipeFallbackImg : image}
          alt={`${title} image`}
        />
      </div>
      <div className={styles.infoPanel}>
        <div className={styles.ratings}>
          <Rating
            name="recipe-rating"
            readOnly
            precision={0.5}
            value={rating}
          />
          <Rating
            name="recipe-rating"
            icon={<Place />}
            emptyIcon={<PlaceOutlined />}
            readOnly
            precision={0.5}
            value={rating}
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

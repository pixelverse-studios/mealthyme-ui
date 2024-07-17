import { AccessTimeTwoTone, LocalDiningTwoTone } from '@mui/icons-material'

import { RecipeType } from '../../../../utils/types/recipes'
import styles from './Feed.module.scss'

const recipeFallbackImg =
  'https://res.cloudinary.com/mealthyme/image/upload/mealthyme/placeholders/recipe_placeholder_yszhtf.jpg'

const FeedItem = ({
  recipe: { title, category, image, tags, totalTime, servings }
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
        <div className={styles.singleRow}>
          <p>
            <AccessTimeTwoTone /> {totalTime}
          </p>
          <p>
            <LocalDiningTwoTone /> {servings ?? 0}
          </p>
        </div>
        <div className={styles.tags}>
          {tags.map(tag => (
            <div key={tag}>#{tag}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedItem

import { useSelector } from 'react-redux'

import { RecipeType } from '@/utils/types/recipes'
import FilterBar from './FilterBar'
import FeedItem from './FeedItem'

import styles from './Feed.module.scss'

const RecipeFeed = ({ recipes }: { recipes: RecipeType[] }) => {
  const { layout } = useSelector((state: any) => state.recipes)

  if (!recipes?.length) return <span>loading...</span>

  return (
    <div className={`${styles.Feed} ${styles[layout]}`}>
      <FilterBar />
      <div className={styles.feedContent}>
        {recipes.map(recipe => (
          <FeedItem key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default RecipeFeed

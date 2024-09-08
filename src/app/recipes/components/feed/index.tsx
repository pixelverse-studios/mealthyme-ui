import { useRouter } from 'next/navigation'
import { FaSquarePlus } from 'react-icons/fa6'

import { useRecipeStore } from '../../../../lib/store'
import { IconLoader } from '../../../../components/elements'
import { RecipeType } from '../../../../utils/types/recipes'
import FilterBar from './FilterBar'
import FeedItem from './FeedItem'

import styles from './Feed.module.scss'
import { RECIPE_ROUTES } from '../../../../components/nav/utils'

interface RecipeFeedProps {
  recipes: RecipeType[]
  loading: boolean
  canDelete: boolean
}

const RecipeFeed = ({ recipes, loading, canDelete }: RecipeFeedProps) => {
  const { layout } = useRecipeStore()
  const router = useRouter()

  const onNewClick = () => router.push(RECIPE_ROUTES.create)

  if (loading) return <IconLoader loading={true} />

  return (
    <div className={`${styles.Feed} ${styles[layout.value]}`}>
      <FilterBar />
      <div className={styles.feedContent}>
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <FeedItem canDelete={canDelete} key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <div className={styles.firstRecipeMsg} onClick={onNewClick}>
            <FaSquarePlus />
            Add your first recipe now!
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeFeed

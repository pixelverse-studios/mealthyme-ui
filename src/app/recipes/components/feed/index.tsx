import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { AddBoxTwoTone } from '@mui/icons-material'

import { IconLoader } from '../../../../components/elements'
import { RecipeType } from '../../../../utils/types/recipes'
import FilterBar from './FilterBar'
import FeedItem from './FeedItem'

import styles from './Feed.module.scss'
import { RECIPE_ROUTES } from '../../../../components/nav/utils'

interface RecipeFeedProps {
  recipes: RecipeType[]
  loading: boolean
}

const RecipeFeed = ({ recipes, loading }: RecipeFeedProps) => {
  const { layout } = useSelector((state: any) => state.recipes)
  const router = useRouter()

  const onNewClick = () => router.push(RECIPE_ROUTES.create)

  if (loading || recipes === null) return <IconLoader loading={true} />

  return (
    <div className={`${styles.Feed} ${styles[layout]}`}>
      <FilterBar />
      <div className={styles.feedContent}>
        {recipes.length > 0 ? (
          recipes.map(recipe => <FeedItem key={recipe._id} recipe={recipe} />)
        ) : (
          <div className={styles.firstRecipeMsg} onClick={onNewClick}>
            <AddBoxTwoTone />
            Add your first recipe now!
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeFeed

import { FaClock, FaEye, FaPeopleGroup, FaTrash } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'

import Banner from '../../../../components/banner'
import { useRecipeStore } from '../../../../lib/store'
import { DELETE_RECIPE } from '../../../../lib/gql/mutations/recipes'
import { RECIPE_ROUTES } from '../../../../components/nav/utils'
import { RecipeType } from '../../../../utils/types/recipes'
import styles from './Feed.module.scss'

const recipeFallbackImg =
  'https://res.cloudinary.com/mealthyme/image/upload/mealthyme/placeholders/recipe_placeholder_yszhtf.jpg'

const FeedItem = ({
  recipe: { title, category, image, tags, totalTime, servings, _id },
  canDelete
}: {
  recipe: RecipeType
  canDelete: boolean
}) => {
  const router = useRouter()

  const onViewClick = () => router.push(`${RECIPE_ROUTES.view}/${_id}`)

  const { removeDeletedRecipe } = useRecipeStore()
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    onCompleted() {
      Banner.Success(`${title} was deleted`)
      return removeDeletedRecipe(_id)
    },
    onError() {
      return Banner.Error(`There was an issue deleting ${title}`)
    }
  })

  const onDeleteClick = async () => {
    deleteRecipe({ variables: { id: _id } })
  }

  return (
    <div className={styles.FeedItem}>
      <div className={styles.topPanel}>
        <div className={styles.title}>
          <h2>{title}</h2>
          <h3>{category.label}</h3>
        </div>
        <img
          src={
            image.src === null || image.src === ''
              ? recipeFallbackImg
              : image.src ?? ''
          }
          alt={`${title} image`}
        />
      </div>
      <div className={styles.infoPanel}>
        <div className={styles.singleRow}>
          <p>
            <FaClock /> {totalTime}
          </p>
          <p>
            <FaPeopleGroup /> {servings ?? 0}
          </p>
        </div>
        {tags?.length > 0 ? (
          <div className={styles.tags}>
            {tags.map(tag => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
        ) : null}
        <div className={styles.actions}>
          <FaEye onClick={onViewClick} />
          {canDelete ? <FaTrash onClick={onDeleteClick} /> : null}
        </div>
      </div>
    </div>
  )
}

export default FeedItem

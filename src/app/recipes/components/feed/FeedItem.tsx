import { FaClock, FaEye, FaPeopleGroup, FaTrash } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  ActionIcon,
  Avatar
} from '@mantine/core'

import Banner from '../../../../components/banner'
import { useRecipeStore } from '../../../../lib/store'
import { DELETE_RECIPE } from '../../../../lib/gql/mutations/recipes'
import { RECIPE_ROUTES } from '../../../../components/nav/utils'
import { RecipeType } from '../../../../utils/types/recipes'
import styles from './Feed.module.scss'

const recipeFallbackImg =
  'https://res.cloudinary.com/mealthyme/image/upload/mealthyme/placeholders/recipe_placeholder_yszhtf.jpg'

const FeedItem = ({
  recipe: { title, image, totalTime, servings, _id, user },
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
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Card.Section>
        <Image
          src={
            image.src === null || image.src === ''
              ? recipeFallbackImg
              : image.src ?? ''
          }
          height={150}
          alt={`${title} image`}
        />
      </Card.Section>
      <Card.Section className={styles.cardContent}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.author}>{user?.firstName}</p>
        </div>
        <div className={styles.details}>
          <div className={styles.subDetails}>
            <p>
              <FaClock /> {totalTime}
            </p>
            <p>
              <FaPeopleGroup /> {servings}
            </p>
          </div>
          <div className={styles.subDetails}>
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="md"
              color="accent"
              onClick={() => onViewClick()}>
              <FaEye />
            </ActionIcon>
            {canDelete ? (
              <ActionIcon
                variant="subtle"
                size="lg"
                radius="md"
                color="accent"
                onClick={() => onDeleteClick()}>
                <FaTrash />
              </ActionIcon>
            ) : null}
          </div>
        </div>
      </Card.Section>
    </Card>
  )
}

export default FeedItem

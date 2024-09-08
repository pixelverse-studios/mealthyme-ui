import { ActionIcon } from '@mantine/core'
import { FaTrash } from 'react-icons/fa6'

import IngredientSearch from './IngredientSearch'
import { Ingredient } from '../../../utils/types/recipes'
import styles from './RecipeForm.module.scss'

interface IngredientsProps {
  handleChange: (data: any, name: string) => void
  ingredients: Ingredient[] | []
}

const Ingredients = ({ handleChange, ingredients }: IngredientsProps) => {
  const onIngredientUpdate = (data: any) => {
    handleChange([...ingredients, data], 'ingredients')
  }

  const onIngredientDelete = (id: number) =>
    handleChange(
      ingredients.filter(item => item.id !== id),
      'ingredients'
    )

  return (
    <section>
      <div className={styles.ingredients}>
        <ul>
          {ingredients?.length > 0
            ? ingredients?.map(ingredient => (
                <li key={ingredient.id}>
                  <span>{ingredient.name}</span>
                  <span>{ingredient.amount}</span>
                  <span>{ingredient.units.base}</span>
                  <ActionIcon
                    variant="subtle"
                    size="lg"
                    radius="md"
                    color="dark"
                    onClick={() => onIngredientDelete(ingredient.id)}>
                    <FaTrash />
                  </ActionIcon>
                </li>
              ))
            : null}
        </ul>
      </div>
      <IngredientSearch handleIngredientUpdate={onIngredientUpdate} />
    </section>
  )
}

export default Ingredients

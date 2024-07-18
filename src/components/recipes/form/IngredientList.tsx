'use client'
import { Info } from '@mui/icons-material'

import IngredientListItem from './IngredientListItem'
import { RecipeFormProps } from '../../../utils/types/fields'
import { Ingredient } from '../../../utils/types/recipes'
import { ToolTip } from '../../elements'
import styles from './RecipeForm.module.scss'

interface IngredientListProps extends RecipeFormProps {
  field: {
    error: string
    value: Ingredient[]
  }
}

const INFO =
  'Search for the ingredients you need. If you cant find what you are looking for, create your own custom ingredient/food.'
const IngredientList = ({
  handleNonFormEventChange,
  field
}: IngredientListProps) => {
  const onIngredientUpdate = (data: any) =>
    handleNonFormEventChange([...field.value, data], 'ingredients')

  const onIngredientDelete = (id: number) =>
    handleNonFormEventChange(
      field.value.filter(item => item.id !== id),
      'ingredients'
    )

  return (
    <div className={styles.IngredientList}>
      <h4>
        Ingredients{' '}
        <ToolTip info={INFO}>
          <Info />
        </ToolTip>
      </h4>
      <div className={styles.ingredients}>
        {field.value?.length > 0
          ? field.value.map((ingr, index) => (
              <IngredientListItem
                key={index}
                isNew={false}
                isEditing={false}
                item={ingr}
                label={ingr.name}
                id={ingr.name}
                handleIngredientUpdate={onIngredientUpdate}
                handleIngredientDelete={onIngredientDelete}
              />
            ))
          : null}
        <IngredientListItem
          id="searchNew"
          isEditing={false}
          isNew
          label="Search Ingredient"
          item={null}
          handleIngredientUpdate={onIngredientUpdate}
          handleIngredientDelete={onIngredientDelete}
        />
      </div>
    </div>
  )
}

export default IngredientList

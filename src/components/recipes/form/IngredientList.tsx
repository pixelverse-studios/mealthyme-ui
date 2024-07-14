'use client'
import { useMemo, useState } from 'react'
import { Tooltip, ClickAwayListener, Fade } from '@mui/material'
import { Info } from '@mui/icons-material'

import { useScreenSize } from '../../../hooks'
import IngredientListItem from './IngredientListItem'
import { RecipeFormProps } from '../../../utils/types/fields'
import { Ingredient } from '../../../utils/types/recipes'
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
  const { isMobileWidth } = useScreenSize()
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const tooltipProps = useMemo(
    () =>
      isMobileWidth
        ? {
            PopperProps: { disablePortal: true },
            onClose: () => setShowInfo(false),
            open: showInfo,
            disableFocusListener: true,
            disableHoverListener: true,
            disableTouchListener: true
          }
        : {},
    [isMobileWidth, showInfo]
  )
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
        <ClickAwayListener onClickAway={() => setShowInfo(false)}>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
            title={INFO}
            arrow
            {...tooltipProps}>
            <Info onClick={() => setShowInfo(true)} />
          </Tooltip>
        </ClickAwayListener>
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

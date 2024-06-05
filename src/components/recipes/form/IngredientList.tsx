'use client'
import { useMemo, useState } from 'react'
import { Tooltip, ClickAwayListener, Fade } from '@mui/material'
import { Info } from '@mui/icons-material'

import hooks from '../../../hooks'
import IngredientListItem from './IngredientListItem'
import { RecipeFormProps, ListInputProps } from '../../../utils/types/fields'
// import { Ingredient } from '@/utils/types/recipes'
import styles from './RecipeForm.module.scss'

interface IngredientListProps extends RecipeFormProps {
  field: ListInputProps
}

const INFO =
  'Search for the ingredients you need. If you cant find what you are looking for, create your own custom ingredient/food.'
const IngredientList = ({
  handleNonFormEventChange,
  field
}: IngredientListProps) => {
  const { isMobileWidth } = hooks.useScreenSize()
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
  const onNewIngredientAdd = (data: any) =>
    handleNonFormEventChange([...field.value, data], 'ingredients')

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
        {/* {field.value?.length > 0
          ? field.value.map((item, index) => {
              console.log(item)
              return (
                <IngredientListItem
                  key={index}
                  isNew={false}
                  isEditing={false}
                  item={null}
                  label=
                />
              )
            })
          : null} */}
        <IngredientListItem
          id="searchNew"
          isEditing={false}
          isNew
          label="Search Ingredient"
          item={null}
          onNewIngredientAdd={onNewIngredientAdd}
        />
      </div>
    </div>
  )
}

export default IngredientList

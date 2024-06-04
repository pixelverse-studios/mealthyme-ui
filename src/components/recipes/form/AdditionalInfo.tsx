'use client'
import { Paper } from '@mui/material'
import { Star, StarBorder, Favorite, FavoriteBorder } from '@mui/icons-material'

import { RatingField } from '@/components/fields'
import ListBuilder from './ListBuilder'
import IngredientList from './IngredientList'
import { RecipeFormProps } from '@/utils/types/fields'
import FormValidations from '@/utils/validations/form'

const AdditionalInfo = ({
  form,
  // handleChange,
  handleNonFormEventChange
}: RecipeFormProps) => {
  const sharedProps = {
    form: null,
    handleChange: () => null,
    handleNonFormEventChange
  }
  return (
    <div>
      <IngredientList {...sharedProps} field={form.ingredients} />
      <ListBuilder
        {...sharedProps}
        label="Instructions"
        id="instructions"
        field={form.instructions}
        handleNonFormEventChange={handleNonFormEventChange}
        display="list"
        validation={FormValidations.validAlphaNumericSpacesSpecials}
      />
      <ListBuilder
        {...sharedProps}
        label="Allergies"
        id="allergies"
        field={form.allergies}
        handleNonFormEventChange={handleNonFormEventChange}
        display="chip"
        validation={FormValidations.validAlphaNumeric}
      />
      <ListBuilder
        {...sharedProps}
        label="Tags"
        id="tags"
        field={form.tags}
        handleNonFormEventChange={handleNonFormEventChange}
        display="chip"
        validation={FormValidations.validAlphaNumeric}
      />
      <Paper>
        <RatingField
          field={form.rating}
          id="rating"
          label="Rating"
          onChange={handleNonFormEventChange}
          icon={<Star />}
          emptyIcon={<StarBorder />}
        />
        <RatingField
          field={form.difficulty}
          id="difficulty"
          label="Difficulty Level"
          onChange={handleNonFormEventChange}
          icon={<Favorite />}
          emptyIcon={
            <FavoriteBorder
              fontSize="inherit"
              style={{ pointerEvents: 'auto' }}
            />
          }
        />
      </Paper>
    </div>
  )
}

export default AdditionalInfo

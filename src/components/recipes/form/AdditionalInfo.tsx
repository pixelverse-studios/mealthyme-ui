'use client'
import { Paper } from '@mui/material'
import { Star, StarBorder, Favorite, FavoriteBorder } from '@mui/icons-material'

import { RatingField } from '@/components/fields'
import ListBuilder from './ListBuilder'
import { RecipeFormProps } from '@/utils/types/fields'
import FormValidations from '@/utils/validations/form'

const AdditionalInfo = ({
  form,
  handleChange,
  handleNonFormEventChange
}: RecipeFormProps) => {
  return (
    <div>
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
      <ListBuilder
        label="Instructions"
        id="instructions"
        field={form.instructions}
        handleNonFormEventChange={handleNonFormEventChange}
        form={null}
        handleChange={() => null}
        display="list"
        validation={FormValidations.validAlphaNumericSpacesSpecials}
      />
      <ListBuilder
        label="Allergies"
        id="allergies"
        field={form.allergies}
        handleNonFormEventChange={handleNonFormEventChange}
        form={null}
        handleChange={() => null}
        display="chip"
        validation={FormValidations.validAlphaNumeric}
      />
      <ListBuilder
        label="Tags"
        id="tags"
        field={form.tags}
        handleNonFormEventChange={handleNonFormEventChange}
        form={null}
        handleChange={() => null}
        display="chip"
        validation={FormValidations.validAlphaNumeric}
      />
    </div>
  )
}

export default AdditionalInfo

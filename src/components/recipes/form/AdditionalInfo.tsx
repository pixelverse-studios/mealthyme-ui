'use client'

import { Card } from '../../elements'
import ListBuilder from './ListBuilder'
import IngredientList from './IngredientList'
import { RecipeFormProps } from '../../../utils/types/fields'
import FormValidations from '../../../utils/validations/form'
import styles from './RecipeForm.module.scss'

const AdditionalInfo = ({
  form,
  // handleChange,
  handleNonFormEventChange,
  handleValidation
}: RecipeFormProps) => {
  const sharedProps = {
    form: null,
    handleChange: () => null,
    handleNonFormEventChange,
    handleValidation
  }
  return (
    <section className={styles.additionalInfo}>
      <Card>
        <IngredientList {...sharedProps} field={form.ingredients} />
      </Card>
      <Card>
        <ListBuilder
          {...sharedProps}
          label="Instructions"
          id="instructions"
          field={form.instructions}
          handleNonFormEventChange={handleNonFormEventChange}
          display="list"
          validation={FormValidations.validAlphaNumericSpacesSpecials}
        />
      </Card>
      <Card>
        <ListBuilder
          {...sharedProps}
          label="Allergies"
          id="allergies"
          field={form.allergies}
          handleNonFormEventChange={handleNonFormEventChange}
          display="chip"
          validation={FormValidations.validAlphaNumeric}
        />
      </Card>
      <Card>
        <ListBuilder
          {...sharedProps}
          label="Tags"
          id="tags"
          field={form.tags}
          handleNonFormEventChange={handleNonFormEventChange}
          display="chip"
          validation={FormValidations.validAlphaNumeric}
        />
      </Card>
    </section>
  )
}

export default AdditionalInfo

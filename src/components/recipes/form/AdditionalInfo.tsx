'use client'

import { Card } from '@mantine/core'
import ListBuilder from './ListBuilder'
import Ingredients from './Ingredients'
import { RecipeFormProps } from '../../../utils/types/fields'
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
    handleValidation,
    handleNumberChange: () => null
  }
  return (
    <section className={styles.additionalInfo}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Ingredients
          handleChange={handleNonFormEventChange}
          ingredients={form.ingredients.value}
        />
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ListBuilder
          {...sharedProps}
          label="Instructions"
          id="instructions"
          field={form.instructions}
          handleNonFormEventChange={handleNonFormEventChange}
          display="list"
        />
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ListBuilder
          {...sharedProps}
          label="Notes"
          id="notes"
          field={form.notes}
          handleNonFormEventChange={handleNonFormEventChange}
          display="list"
        />
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ListBuilder
          {...sharedProps}
          label="Allergies"
          id="allergies"
          field={form.allergies}
          handleNonFormEventChange={handleNonFormEventChange}
          display="chip"
        />
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ListBuilder
          {...sharedProps}
          label="Tags"
          id="tags"
          field={form.tags}
          handleNonFormEventChange={handleNonFormEventChange}
          display="chip"
        />
      </Card>
    </section>
  )
}

export default AdditionalInfo

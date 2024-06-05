'use client'

import hooks from '../../../hooks'
import GeneralInfo from './GeneralInfo'
import AdditionalInfo from './AdditionalInfo'
import { initialRecipeForm } from './utils'
import FormValidations from '../../../utils/validations/form'
import styles from './RecipeForm.module.scss'

const validations = {
  title: FormValidations.validAlphaNumericSpacesSpecials,
  servings: FormValidations.validNonZeroNumber,
  ingredients: FormValidations.validArrayData,
  instructions: FormValidations.validArrayData,
  cookingMethod: FormValidations.validAlphaNumericWithSpaces,
  allergies: FormValidations.validArrayData,
  category: FormValidations.yolo,
  rating: FormValidations.validFloat,
  difficulty: FormValidations.validFloat,
  prepTime: FormValidations.yolo,
  cookTime: FormValidations.yolo,
  tags: FormValidations.validArrayData,
  image: FormValidations.yolo
}
// const RecipeForm = ({ isEdit }: { isEdit: boolean }) => {
const RecipeForm = () => {
  const { form, handleChange, handleNonFormEventChange } = hooks.useForm(
    initialRecipeForm,
    validations
  )

  return (
    <div className={styles.RecipeForm}>
      <GeneralInfo
        form={form}
        handleChange={handleChange}
        handleNonFormEventChange={handleNonFormEventChange}
      />
      <AdditionalInfo
        form={form}
        handleChange={handleChange}
        handleNonFormEventChange={handleNonFormEventChange}
      />
    </div>
  )
}

export default RecipeForm

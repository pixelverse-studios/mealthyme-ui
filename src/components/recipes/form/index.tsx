'use client'
import { useSelector } from 'react-redux'

import { useForm, useImageUpload, useRecipes } from '../../../hooks'
import GeneralInfo from './GeneralInfo'
import AdditionalInfo from './AdditionalInfo'
import {
  initialRecipeForm,
  recipeFormValidations,
  sanitizeNewRecipe
} from './utils'
import styles from './RecipeForm.module.scss'

// const RecipeForm = ({ isEdit }: { isEdit: boolean }) => {
const RecipeForm = () => {
  const {
    form,
    handleChange,
    handleNonFormEventChange,
    isFormValid,
    handleValidation
  } = useForm(initialRecipeForm, recipeFormValidations)
  const { profile } = useSelector((state: any) => state.user)

  const { handleUpload } = useImageUpload()
  const { submitNewRecipe } = useRecipes()

  const onSubmit = async () => {
    const { image } = form
    const payload = { ...form }

    const hasImg = image.value !== ''
    const res = hasImg
      ? await handleUpload({
          base64: image.value.base64,
          filename: image.value.name
        })
      : null

    const sanitizedPayload = sanitizeNewRecipe(
      payload,
      res?.url ?? '',
      res?.public_id ?? ''
    )
    submitNewRecipe(profile._id, sanitizedPayload)
  }

  return (
    <div className={styles.recipeForm}>
      <div className={styles.formBlock}>
        <GeneralInfo
          form={form}
          handleChange={handleChange}
          handleNonFormEventChange={handleNonFormEventChange}
          handleValidation={handleValidation}
        />
        <AdditionalInfo
          form={form}
          handleChange={handleChange}
          handleNonFormEventChange={handleNonFormEventChange}
          handleValidation={handleValidation}
        />
      </div>
      <div className={styles.buttonRow}>
        <button
          onClick={onSubmit}
          disabled={!isFormValid}
          className={styles.submitButton}>
          Create Recipe
        </button>
      </div>
    </div>
  )
}

export default RecipeForm

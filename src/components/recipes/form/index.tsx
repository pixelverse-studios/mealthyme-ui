'use client'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import { RadialLoader } from '../../elements'
import { useForm, useImageUpload, useRecipes } from '../../../hooks'
import GeneralInfo from './GeneralInfo'
import AdditionalInfo from './AdditionalInfo'
import {
  initialRecipeForm,
  recipeFormValidations,
  sanitizeNewRecipe
} from './utils'
import Banner from '../../banner'
import styles from './RecipeForm.module.scss'

const RecipeForm = () => {
  const router = useRouter()
  const {
    form,
    handleChange,
    handleNonFormEventChange,
    isFormValid,
    handleValidation
  } = useForm(initialRecipeForm, recipeFormValidations)
  const { profile } = useSelector((state: any) => state.user)
  const { loading } = useSelector((state: any) => state.recipes)

  const { handleUpload } = useImageUpload()
  const { submitNewRecipe } = useRecipes()

  const onSuccess = () => router.push('/recipes/new/recap')

  const onSubmit = async () => {
    try {
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
      await submitNewRecipe(profile._id, sanitizedPayload)
      return onSuccess()
    } catch (error) {
      return Banner.TechDiff()
    }
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
        <RadialLoader loading={loading} />
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

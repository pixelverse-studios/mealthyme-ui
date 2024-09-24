'use client'
import { useRouter } from 'next/navigation'

import { useUserStore } from '../../../lib/store'
// import { useUserStore, useRecipeStore } from '../../../lib/store'
import { useForm, useImageUpload, useRecipes } from '../../../hooks'
import GeneralInfo from './GeneralInfo'
import AdditionalInfo from './AdditionalInfo'
import {
  initialRecipeForm,
  recipeFormValidations,
  sanitizeNewRecipe
} from './utils'
import Banner from '../../banner'
import { RECIPE_ROUTES } from '../../nav/utils'
import styles from './RecipeForm.module.scss'

const RecipeForm = () => {
  const router = useRouter()
  const {
    form,
    handleChange,
    handleNumberChange,
    handleNonFormEventChange,
    handleValidation
  } = useForm(initialRecipeForm, recipeFormValidations)
  const { profile } = useUserStore()
  // const { loading } = useRecipeStore()
  const { handleUpload } = useImageUpload()
  const { submitNewRecipe } = useRecipes()

  const onSuccess = () => router.push(RECIPE_ROUTES.recap)

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

  const canSubmit =
    form?.category?.value?.label !== '' &&
    form?.ingredients?.value?.length > 0 &&
    form?.servings?.value > 0 &&
    form?.title?.value !== ''

  return (
    <div className={styles.recipeForm}>
      <div className={styles.formBlock}>
        <GeneralInfo
          form={form}
          handleChange={handleChange}
          handleNumberChange={handleNumberChange}
          handleNonFormEventChange={handleNonFormEventChange}
          handleValidation={handleValidation}
        />
        <AdditionalInfo
          form={form}
          handleNumberChange={handleNumberChange}
          handleChange={handleChange}
          handleNonFormEventChange={handleNonFormEventChange}
          handleValidation={handleValidation}
        />
      </div>
      <div className={styles.buttonRow}>
        {/* TODO: ADD LOADER */}
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={styles.submitButton}>
          Create Recipe
        </button>
      </div>
    </div>
  )
}

export default RecipeForm

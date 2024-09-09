'use client'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Card } from '@mantine/core'
import { TextInput, NumberInput, Rating } from '@mantine/core'

import { useUserStore } from '../../../lib/store'
import { AutoComplete } from '../../fields'
import { GET_USER_CATEGORIES } from '../../../lib/gql/queries/categories'
import { isHandledError } from '../../../utils/gql'
import Banner from '../../banner'
import Upload from '../../upload'
import { RecipeFormProps } from '../../../utils/types/fields'
import FormRow from '../../form/Row'
import { ImageProps } from '../../upload'
import styles from './RecipeForm.module.scss'
import stripTypenames from '../../../utils/stripTypenames'

const GeneralInfo = ({
  form,
  handleChange,
  handleNumberChange,
  handleNonFormEventChange,
  handleValidation
}: RecipeFormProps) => {
  const { profile } = useUserStore()

  const [categories, setCategories] = useState<
    { _id: string; label: string }[]
  >([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  const [getAllUserCategories] = useLazyQuery(GET_USER_CATEGORIES, {
    async onCompleted({ getAllUserCategories: data }) {
      if (isHandledError(data)) {
        return Banner.Error(data.message)
      } else {
        setCategories(stripTypenames(data.UsersCategories))
        return setLoadingCategories(false)
      }
    },
    onError() {
      Banner.Error('There was an error getting your categories')
    }
  })

  useEffect(() => {
    if (!loadingCategories && categories?.length === 0 && profile?._id !== '') {
      setLoadingCategories(true)
      getAllUserCategories({ variables: { userId: profile._id } })
    }
  }, [categories, getAllUserCategories, loadingCategories, profile])

  const onImageUpload = (img: ImageProps) =>
    handleNonFormEventChange(img, 'image')

  return (
    <div className={styles.generalInfo}>
      <Card
        className={styles.genInfoKeyFields}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder>
        <Upload callback={onImageUpload} />
        <div className={styles.formFields}>
          <FormRow>
            <TextInput
              id="title"
              label="Title"
              onBlur={handleValidation}
              onChange={handleChange}
              value={form.title.value}
              withAsterisk
            />
          </FormRow>
          <FormRow>
            <AutoComplete
              required
              id="category"
              label="Category"
              options={categories}
              value={form.category.value ?? null}
              onChange={handleNonFormEventChange}
            />
            <NumberInput
              value={form.servings.value}
              id="servings"
              onChange={e => handleNumberChange(e, 'servings')}
              label="Servings"
            />
          </FormRow>
          <FormRow>
            <NumberInput
              withAsterisk
              value={form.prepTime.value}
              id="prepTime"
              onChange={e => handleNumberChange(e, 'prepTime')}
              label="Prep Time"
            />
            <NumberInput
              withAsterisk
              value={form.cookTime.value}
              id="cookTime"
              onChange={e => handleNumberChange(e, 'cookTime')}
              label="Cook Time"
            />
          </FormRow>
        </div>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <label>Difficulty Level</label>
        <Rating
          value={form.difficulty.value}
          onChange={e => handleNumberChange(e, 'difficulty')}
          id="difficulty"
        />
      </Card>
    </div>
  )
}

export default GeneralInfo

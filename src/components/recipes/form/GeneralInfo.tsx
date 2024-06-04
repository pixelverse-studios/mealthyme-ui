'use client'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLazyQuery } from '@apollo/client'

import { TextField, NumberField, AutoComplete } from '@/components/fields'
import { GET_USER_CATEGORIES } from '@/lib/gql/queries/categories'
import { isHandledError } from '@/utils/gql'
import Banner from '@/components/banner'
import Upload from '@/components/upload'
import { RecipeFormProps } from '@/utils/types/fields'
import FormRow from '@/components/form/Row'
import styles from './RecipeForm.module.scss'

const GeneralInfo = ({
  form,
  handleChange,
  handleNonFormEventChange
}: RecipeFormProps) => {
  const { profile } = useSelector((state: any) => state.user)

  const [categories, setCategories] = useState<
    { _id: string; label: string }[]
  >([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  const [getAllUserCategories] = useLazyQuery(GET_USER_CATEGORIES, {
    async onCompleted({ getAllUserCategories: data }) {
      if (isHandledError(data)) {
        return Banner.Error(data.message)
      } else {
        setCategories(data.UsersCategories)
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

  return (
    <div className={styles.generalInfo}>
      <Upload isEdit={false} />
      <div className={styles.formFields}>
        <FormRow>
          <TextField
            field={form.title}
            id="title"
            type="text"
            onChange={handleChange}
            label="Title"
          />
        </FormRow>
        <FormRow>
          <AutoComplete
            id="category"
            label="Category"
            options={categories}
            value={form.category.value ?? null}
            onChange={handleNonFormEventChange}
          />
          <NumberField
            field={form.servings}
            id="servings"
            label="Servings"
            onChange={handleNonFormEventChange}
          />
        </FormRow>
        <FormRow>
          <NumberField
            field={form.prepTime}
            id="prepTime"
            label="Prep Time"
            onChange={handleNonFormEventChange}
          />
          <NumberField
            field={form.cookTime}
            id="cookTime"
            label="Cook Time"
            onChange={handleNonFormEventChange}
          />
        </FormRow>
      </div>
    </div>
  )
}

export default GeneralInfo

'use client'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLazyQuery } from '@apollo/client'
import {
  Autocomplete,
  TextField as MuiTextField,
  createFilterOptions
} from '@mui/material'

import { TextField, NumberField } from '@/components/fields'
import { GET_USER_CATEGORIES } from '@/lib/gql/queries/categories'
import { isHandledError } from '@/utils/gql'
import Banner from '@/components/banner'
import Upload from '@/components/upload'
import { RecipeFormProps } from '@/utils/types/fields'

const filter = createFilterOptions<{ _id: string; label: string }[]>()

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
    <div>
      <Upload isEdit={false} />
      <TextField
        field={form.title}
        id="title"
        type="text"
        onChange={handleChange}
        label="Title"
      />
      <Autocomplete
        options={categories}
        size="small"
        onChange={(event, newValue) =>
          handleNonFormEventChange(newValue, 'category')
        }
        filterOptions={(options, params) => {
          const filtered = filter(options, params) as any
          const { inputValue } = params
          const isExisting = options.some(option => inputValue === option.title)
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              _id: '',
              label: inputValue + ''
            })
          }

          return filtered
        }}
        id="category"
        value={form.category.value?.label}
        renderInput={params => <MuiTextField {...params} label="Category" />}
      />
      <NumberField
        field={form.servings}
        id="servings"
        label="Servings"
        onChange={handleNonFormEventChange}
        variant="outlined"
      />
      <NumberField
        field={form.prepTime}
        id="prepTime"
        label="Prep Time"
        onChange={handleNonFormEventChange}
        variant="outlined"
      />
      <NumberField
        field={form.cookTime}
        id="cookTime"
        label="Cook Time"
        onChange={handleNonFormEventChange}
        variant="outlined"
      />
    </div>
  )
}

export default GeneralInfo

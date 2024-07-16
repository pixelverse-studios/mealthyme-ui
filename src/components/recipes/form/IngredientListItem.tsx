import { ChangeEvent, useState, useCallback, useEffect, useMemo } from 'react'
import { useLazyQuery } from '@apollo/client'
import { MenuItem, Menu, Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

import stripTypenames from '../../../utils/stripTypenames'
import { SearchResultType } from '../../../utils/types/food'
import { Ingredient } from '../../../utils/types/recipes'
import { TextField, SelectField, NumberField } from '../../fields'
import Banner from '../../banner'
import { useDebounce } from '../../../hooks'
import { GET_SEARCH_RESULTS, GET_FOOD } from '../../../lib/gql/queries/food'
import { LinearLoader } from '../../elements'
import FormValidations from '../../../utils/validations/form'
import { isHandledError } from '../../../utils/gql'
import StringUtils from '../../../utils/validations/strings'
import styles from './RecipeForm.module.scss'
import { FieldInputProps } from '../../../utils/types/fields'

interface ResultProps {
  anchor: HTMLElement | null
  clearAnchor: () => void
  onClick: (obj: SearchResultType) => void
  results: SearchResultType[]
  param: string
  loading: boolean
  show: boolean
}

const SearchResults = ({
  anchor,
  clearAnchor,
  loading,
  onClick,
  param,
  show,
  results
}: ResultProps) => {
  if (!show) return null
  const renderResults = () => {
    if (loading) return <MenuItem>Loading...</MenuItem>
    if (results?.length === 0) return <MenuItem>No results</MenuItem>
    return results.map((result: SearchResultType) => {
      const sanitizedName = StringUtils.capitalizeFirstLetters(result.name)

      return (
        <MenuItem key={result.id} onClick={() => onClick(result)}>
          {sanitizedName}
        </MenuItem>
      )
    })
  }
  return anchor ? (
    <Menu
      className={styles.IngredientResults}
      open={Boolean(param)}
      onClose={clearAnchor}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}>
      {renderResults()}
    </Menu>
  ) : null
}

interface IngredientItemProps {
  isNew: boolean
  isEditing: boolean
  item: Ingredient | null
  label: string
  id: string
  handleIngredientUpdate: (data: any) => void
  handleIngredientDelete: (data: any) => void
}

const DEFAULT_SEARCH = {
  value: '',
  msgType: '',
  valid: null,
  message: FormValidations.validAlphaNumericSpacesSpecials.message
}
const DEFAULT_UNIT = {
  value: '',
  valid: null,
  message: 'A unit of measurement is required.',
  msgType: 'error'
}
const IngredientListItem = ({
  id,
  isEditing,
  isNew,
  label,
  item,
  handleIngredientUpdate,
  handleIngredientDelete
}: IngredientItemProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [search, setSearch] = useState<{
    value: string
    msgType: string
    valid: boolean | null
    message: string
  }>(DEFAULT_SEARCH)
  const debouncedValue = useDebounce(search.value, 500)

  const [results, setResults] = useState<SearchResultType[] | []>([])
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false)
  const [getSearchResults] = useLazyQuery(GET_SEARCH_RESULTS, {
    async onCompleted({ getSearchResults: data }) {
      if (isHandledError(data)) return Banner.Error(data.message)
      setResults(stripTypenames(data.Autocompletes))
      setLoadingSearch(false)
    },
    onError() {
      setLoadingSearch(false)
      return Banner.Error('There was an issue fetching search results.')
    }
  })

  const [selected, setSelected] = useState<SearchResultType | null>(null)

  const shouldShowResults = useMemo(
    () =>
      menuAnchor !== null &&
      debouncedValue === search.value &&
      search.value !== '',
    [debouncedValue, menuAnchor, search.value]
  )
  useEffect(() => {
    if (shouldShowResults) {
      setLoadingSearch(true)
      getSearchResults({ variables: { query: search.value } })
    }
  }, [getSearchResults, search.value, shouldShowResults])

  const onCloseResults = () => {
    setMenuAnchor(null)
  }

  const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMenuAnchor(event.currentTarget)
    const { value } = event.target
    const valid = !FormValidations.validAlphaNumericSpacesSpecials.test(value)
    const sanitizedValue = StringUtils.capitalizeFirstLetters(value)
    setSearch({
      value: sanitizedValue,
      message: valid
        ? ''
        : FormValidations.validAlphaNumericSpacesSpecials.message,
      msgType: valid ? '' : 'error',
      valid
    })
  }, [])

  const [loadingFood, setLoadingFood] = useState<boolean>(false)
  const [selectedUnit, setSelectedUnit] = useState<{
    value: string
    valid: boolean | null
    message: string
    msgType: string
  } | null>(DEFAULT_UNIT)

  const resetForm = () => {
    setResults([])
    setMenuAnchor(null)
    setSearch(DEFAULT_SEARCH)
    setSelectedUnit(null)
    setAmount('')
  }

  const onUnitSelect = (value: string) =>
    setSelectedUnit({ ...DEFAULT_UNIT, value })

  const [getFood] = useLazyQuery(GET_FOOD, {
    async onCompleted({ getFood: data }) {
      if (isHandledError(data)) return Banner.Error(data.message)
      setLoadingFood(false)
      handleIngredientUpdate({ ...data, name: selected?.name ?? data.name })
      resetForm()
      setSelected(null)
    },
    onError() {
      setLoadingFood(false)
      return Banner.Error('There was an issue fetching search results.')
    }
  })
  const [amount, setAmount] = useState<string>('')

  const onClearClick = () => {
    setSelected(null)
    resetForm()
  }
  const onIngredientSelect = (ingredient: SearchResultType) => {
    setSelected(ingredient)
    resetForm()
  }
  const onAmountChange = (data: string) => setAmount(data)

  const onAddClick = () => {
    setLoadingFood(true)
    getFood({
      variables: {
        foodId: selected?.id,
        amount: parseFloat(amount),
        units: selectedUnit?.value
      }
    })
  }

  const onIngredientRemove = (item: any) => handleIngredientDelete(item.id)

  const disableAdd = useMemo(
    () => selected == null || amount === '' || selectedUnit?.value === '',
    [amount, selected, selectedUnit]
  )
  // TODO FIX DISABLE ADD
  if (isNew) {
    return (
      <div className={styles.newIngredient}>
        <div className={styles.fields}>
          <TextField
            id={id}
            label={selected === null ? label : 'Ingredient'}
            field={{
              value: selected === null ? search.value : selected.name,
              msgType: '',
              valid: true,
              message: 'At least 1 ingredient is required'
            }}
            onChange={onSearch}
            onBlur={() => null}
            type="text"
          />
          <NumberField
            disabled={selected === null}
            field={{
              value: amount,
              msgType: 'error',
              valid: true,
              message: ''
            }}
            id="amount"
            label="Amount"
            onChange={onAmountChange}
          />
          <SelectField
            disabled={selected === null}
            onBlur={() => null}
            field={selectedUnit as FieldInputProps}
            label="Units"
            onChange={onUnitSelect}
            options={selected?.units ?? []}
          />
        </div>
        <div className={styles.buttonRow}>
          <div className={styles.buttons}>
            <Button
              onClick={onAddClick}
              disabled={disableAdd}
              color="success"
              variant="contained">
              Add
            </Button>
            <Button
              disabled={loadingFood}
              onClick={onClearClick}
              color="warning"
              variant="outlined">
              Clear
            </Button>
          </div>
          <LinearLoader loading={loadingFood} />
        </div>
        <SearchResults
          loading={loadingSearch}
          onClick={onIngredientSelect}
          param={debouncedValue}
          anchor={menuAnchor}
          clearAnchor={onCloseResults}
          results={results}
          show={shouldShowResults}
        />
      </div>
    )
  }
  if (isEditing) {
    return (
      <div className={styles.existingIngredient}>
        <TextField
          label={label}
          id={id}
          field={{
            value: search.value,
            message: '',
            valid: true,
            msgType: 'error'
          }}
          onBlur={() => null}
          onChange={onSearch}
          type="text"
        />
        <SearchResults
          loading={loadingSearch}
          onClick={onIngredientSelect}
          param={search?.value}
          anchor={menuAnchor}
          clearAnchor={() => setMenuAnchor(null)}
          results={results}
          show={shouldShowResults}
        />
      </div>
    )
  }

  return (
    <div className={styles.existingIngredient}>
      <div className={styles.keyFields}>
        <span>{item?.name}</span>
        <div className={styles.weight}>
          <div>{item?.amount}</div>
          <div className={styles.border} />
          <div>{item?.units?.long}</div>
        </div>
        <IconButton
          onClick={() => onIngredientRemove(item)}
          className={styles.deleteIngr}>
          <Delete />
        </IconButton>
      </div>
    </div>
  )
}

export default IngredientListItem

import { ChangeEvent, useState, useCallback, useEffect, useMemo } from 'react'
import { useLazyQuery } from '@apollo/client'
import { MenuItem, Menu, Button, LinearProgress } from '@mui/material'
import { SearchResultType } from '@/utils/types/food'
import { TextField, SelectField, NumberField } from '@/components/fields'
import Banner from '@/components/banner'
import hooks from '@/hooks'
import { GET_SEARCH_RESULTS, GET_FOOD } from '@/lib/gql/queries/food'
import FormValidations from '@/utils/validations/form'
import { isHandledError } from '@/utils/gql'
import { capitalizeFirstLetters } from '@/utils/validations/strings'
import styles from './RecipeForm.module.scss'

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
      const sanitizedName = capitalizeFirstLetters(result.name)

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
  item: SearchResultType | null
  label: string
  id: string
  onNewIngredientAdd: (data: any) => void
}

const DEFAULT_SEARCH = { value: '', error: '' }
const IngredientListItem = ({
  id,
  isEditing,
  isNew,
  label,
  item,
  onNewIngredientAdd
}: IngredientItemProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [search, setSearch] = useState<{ value: string; error: string }>(
    DEFAULT_SEARCH
  )
  const debouncedValue = hooks.useDebounce(search.value, 500)

  const [results, setResults] = useState<SearchResultType[] | []>([])
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false)
  const [getSearchResults] = useLazyQuery(GET_SEARCH_RESULTS, {
    async onCompleted({ getSearchResults: data }) {
      if (isHandledError(data)) return Banner.Error(data.message)
      setResults(data.Autocompletes)
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
    const error = !FormValidations.validAlphaNumericSpacesSpecials.test(value)
      ? FormValidations.validAlphaNumericSpacesSpecials.message
      : ''
    const sanitizedValue = capitalizeFirstLetters(value)
    setSearch({
      value: sanitizedValue,
      error
    })
  }, [])

  const [loadingFood, setLoadingFood] = useState<boolean>(false)

  const resetForm = () => {
    setResults([])
    setMenuAnchor(null)
    setSearch(DEFAULT_SEARCH)
    setSelectedUnit('')
    setAmount('')
  }
  const [getFood] = useLazyQuery(GET_FOOD, {
    async onCompleted({ getFood: data }) {
      if (isHandledError(data)) return Banner.Error(data.message)
      setLoadingFood(false)
      onNewIngredientAdd(data)
      resetForm()
    },
    onError() {
      setLoadingFood(false)
      return Banner.Error('There was an issue fetching search results.')
    }
  })
  const [selectedUnit, setSelectedUnit] = useState<string>('')
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
        units: selectedUnit
      }
    })
  }
  const disableAdd = useMemo(
    () => selected == null || amount === '' || selectedUnit === '',
    [amount, selected, selectedUnit]
  )

  if (isNew) {
    return (
      <div className={styles.newIngredient}>
        <div className={styles.fields}>
          <TextField
            id={id}
            label={selected === null ? label : 'Ingredient'}
            field={{
              value: selected === null ? search.value : selected.name,
              error: ''
            }}
            onChange={onSearch}
            type="text"
          />
          <NumberField
            disabled={selected === null}
            field={{ value: amount, error: '' }}
            id="amount"
            label="Amount"
            onChange={onAmountChange}
          />
          <SelectField
            disabled={selected === null}
            value={selectedUnit}
            label="Units"
            onChange={setSelectedUnit}
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
          {loadingFood ? (
            <div className={styles.loader}>
              <LinearProgress />
            </div>
          ) : null}
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
          field={{ value: search.value, error: '' }}
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
      <TextField
        label={''}
        id={''}
        field={{ value: item?.name ?? '', error: '' }}
        onChange={onSearch}
        disabled
        type="text"
      />
    </div>
  )
}

export default IngredientListItem

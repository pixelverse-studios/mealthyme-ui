import { useState, useCallback, useEffect, useMemo } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  ActionIcon,
  Combobox,
  NumberInput,
  Select,
  TextInput,
  useCombobox
} from '@mantine/core'
import { FaBan, FaCheck, FaXmark } from 'react-icons/fa6'

import stripTypenames from '../../../utils/stripTypenames'
import { isHandledError } from '../../../utils/gql'
import Banner from '../../banner'
import StringUtils from '../../../utils/validations/strings'
import { SearchResultType } from '../../../utils/types/food'
import { GET_SEARCH_RESULTS, GET_FOOD } from '../../../lib/gql/queries/food'
import { useDebounce } from '../../../hooks'
import typeaheadStyles from '../../fields/AutoComplete.module.css'
import styles from './RecipeForm.module.scss'

interface IngredientSearchProps {
  handleIngredientUpdate: (data: any) => void
}

const IngredientSearch = ({
  handleIngredientUpdate
}: IngredientSearchProps) => {
  const [text, setText] = useState<string>('')
  const [units, setUnits] = useState<string | null>('')
  const [amount, setAmount] = useState<number | string>('')

  const [selected, setSelected] = useState<SearchResultType | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<SearchResultType[] | []>([])

  const combobox = useCombobox()

  const onOptionClick = useCallback(
    (item: any) => {
      setSelected(item)
      combobox.closeDropdown()
      setText('')
    },
    [combobox]
  )

  const onResetSearch = useCallback(() => {
    setSelected(null)
    combobox.resetSelectedOption()
  }, [combobox])

  const debouncedValue = useDebounce(text, 500)

  const [getSearchResults] = useLazyQuery(GET_SEARCH_RESULTS, {
    async onCompleted({ getSearchResults: data }) {
      if (isHandledError(data)) return Banner.Error(data.message)
      setOptions(stripTypenames(data.Autocompletes))
      setLoading(false)
    },
    onError() {
      setLoading(false)
      return Banner.Error('There was an issue fetching search results.')
    }
  })

  useEffect(() => {
    if (debouncedValue === text && StringUtils.isValid(text)) {
      setLoading(true)
      getSearchResults({ variables: { query: text } })
    }
  }, [debouncedValue, getSearchResults, text])

  const searchValue = useMemo(
    () =>
      StringUtils.isValid(text) && StringUtils.isValid(selected?.name)
        ? selected?.name
        : text
          ? text
          : selected?.name ?? '',
    [selected, text]
  )

  const onCancelClick = () => {
    setText('')
    setSelected(null)
    setAmount('')
    setUnits(null)
  }

  const [getFood] = useLazyQuery(GET_FOOD, {
    async onCompleted({ getFood: data }) {
      if (isHandledError(data)) return Banner.Error(data.message)
      handleIngredientUpdate({ ...data, name: selected?.name })
      onCancelClick()
      setLoading(false)
    },
    onError() {
      setLoading(false)
      return Banner.Error('There was an issue fetching search results.')
    }
  })

  const onConfirmIngredient = () => {
    setLoading(true)
    getFood({
      variables: {
        id: selected?.id,
        amount,
        units
      }
    })
  }

  return (
    <div className={styles.ingredientSearchBlock}>
      <div className={styles.fields}>
        <Combobox store={combobox}>
          <Combobox.Target>
            <div className={typeaheadStyles.typeahead}>
              <TextInput
                withAsterisk
                label="Ingredient"
                value={searchValue}
                onChange={event => {
                  if (selected === null || selected.name === text) {
                    setText(event.currentTarget.value)
                  }
                  combobox.openDropdown()
                  combobox.updateSelectedOptionIndex()
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
              />
              {StringUtils.isValid(selected?.name) ||
              StringUtils.isValid(text) ? (
                <FaBan
                  onClick={onResetSearch}
                  className={typeaheadStyles.clear}
                />
              ) : null}
            </div>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options className={styles.ingredientItems}>
              {options.length === 0 ? (
                <Combobox.Empty>
                  {loading ? 'Loading...' : 'Nothing found'}
                </Combobox.Empty>
              ) : (
                <>
                  {options.map(item => (
                    <Combobox.Option
                      className={typeaheadStyles.typeaheadOption}
                      onClick={() => onOptionClick(item)}
                      value={item.name}
                      key={item.id}>
                      {StringUtils.capitalizeFirstLetters(item.name)}
                    </Combobox.Option>
                  ))}
                </>
              )}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <NumberInput
          disabled={selected === null}
          withAsterisk
          value={amount}
          id="amount"
          label="Amount"
          onChange={num => setAmount(num)}
        />
        <Select
          withAsterisk
          label="Units"
          id="unit"
          placeholder="Select one"
          data={selected?.units ?? []}
          value={units ?? null}
          onChange={e => setUnits(e ?? null)}
          disabled={selected === null}
        />
      </div>
      <div className={styles.actions}>
        <ActionIcon
          variant="subtle"
          size="lg"
          loading={loading}
          radius="md"
          color="green"
          onClick={onConfirmIngredient}
          disabled={
            !StringUtils.isValid(selected?.name) ||
            amount === '' ||
            units === '' ||
            loading
          }>
          <FaCheck />
        </ActionIcon>
        <ActionIcon
          disabled={loading}
          variant="subtle"
          size="lg"
          radius="md"
          color="red"
          onClick={onCancelClick}>
          <FaXmark />
        </ActionIcon>
      </div>
    </div>
  )
}

export default IngredientSearch

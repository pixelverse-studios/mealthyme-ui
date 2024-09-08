import { useState } from 'react'
import { Combobox, TextInput, useCombobox } from '@mantine/core'
import { FaCircle, FaBan } from 'react-icons/fa6'

import StringUtils from '../../utils/validations/strings'
import styles from './AutoComplete.module.css'

interface OptionProps {
  _id: string
  label: string
}
interface AutoCompleteProps {
  id: string
  label: string
  onChange: (data: any, name: string) => void
  options: OptionProps[] | []
  value: OptionProps
}

const AutoComplete = ({
  id,
  label,
  onChange,
  options,
  value
}: AutoCompleteProps) => {
  const [text, setText] = useState('')
  const combobox = useCombobox()

  const filteredItems =
    text === ''
      ? options.filter(item => item.label.toLowerCase().includes(text))
      : [...options, { _id: text, label: text }]

  const items = filteredItems.map(item => (
    <Combobox.Option
      className={styles.typeaheadOption}
      value={item._id}
      key={item._id}>
      {item.label}{' '}
      {item._id === text ? <FaCircle className={styles.newIndicator} /> : null}
    </Combobox.Option>
  ))

  const onOptionClick = (val: string) =>
    onChange(
      val === text
        ? { _id: '', label: val }
        : filteredItems.find(item => item._id === val),
      id
    )

  const onResetClick = () => {
    setText('')
    onChange({ _id: '', label: '' }, id)
    combobox.resetSelectedOption()
  }

  const inputValue =
    text && StringUtils.isValid(value?.label)
      ? value.label
      : text
        ? text
        : value?.label

  return (
    <Combobox
      onOptionSubmit={optionValue => {
        onOptionClick(optionValue)
        combobox.closeDropdown()
      }}
      store={combobox}>
      <Combobox.Target>
        <div className={styles.typeahead}>
          <TextInput
            variant="default"
            className={styles.input}
            label={label}
            value={inputValue}
            onChange={event => {
              if (value === null || value._id === value.label) {
                setText(event.currentTarget.value)
              }
              combobox.openDropdown()
              combobox.updateSelectedOptionIndex()
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
          {StringUtils.isValid(value?.label) || StringUtils.isValid(text) ? (
            <FaBan onClick={onResetClick} className={styles.clear} />
          ) : null}
        </div>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          ) : (
            items
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default AutoComplete

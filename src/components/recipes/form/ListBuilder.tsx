import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { TextInput } from '@mantine/core'
import { FaXmark, FaCheck } from 'react-icons/fa6'
import { FaTrash, FaPen } from 'react-icons/fa6'

import { RecipeFormProps, ListInputProps } from '../../../utils/types/fields'
import styles from './RecipeForm.module.scss'

interface ListDisplayProps {
  items: string[]
  onDelete: (value: string) => void
  onEdit: (key: number) => void
}

const ListDisplay = ({ items, onDelete, onEdit }: ListDisplayProps) => {
  if (items?.length === 0) {
    return <div className={styles.ListDisplay} />
  }

  return (
    <div className={styles.ListDisplay}>
      {items.map((item: string, key: number) => {
        const order = key + 1
        const padded = order.toString().padStart(2, '0')
        return (
          <div key={key} className={styles.listItem}>
            <div className={styles.instruction}>
              <span>{padded}</span>
              <span>{item}</span>
            </div>
            <FaPen onClick={() => onEdit(key)} />
            <FaTrash onClick={() => onDelete(item)} />
          </div>
        )
      })}
    </div>
  )
}

const ChipDisplay = ({ items, onDelete, onEdit }: ListDisplayProps) => {
  if (items?.length === 0) {
    return <div />
  }
  return (
    <ul className={styles.ChipDisplay}>
      {items.map((item: string, key: number) => (
        <li className={styles.chip} key={key}>
          <span onClick={() => onEdit(key)}>{item}</span>
          <FaXmark onClick={() => onDelete(item)} />
        </li>
      ))}
    </ul>
  )
}

interface ListBuilderProps extends RecipeFormProps {
  label: string
  id: string
  field: ListInputProps
  display: 'chip' | 'list'
}

const ListBuilder = ({
  label,
  id,
  field,
  handleNonFormEventChange,
  display
}: ListBuilderProps) => {
  const [value, setValue] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const onFieldUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  const onSubmit = () => {
    if (editIndex === null) {
      const newList = [...field.value, value]
      handleNonFormEventChange(newList, id)
      setValue('')
    } else {
      const updated = [...field.value]
      updated[editIndex] = value
      handleNonFormEventChange(updated, id)
      setValue('')
      setEditIndex(null)
    }
  }

  const onEdit = (index: number) => {
    setEditIndex(index)
    setValue(field.value[index])
  }

  const onDelete = (item: string) => {
    const newList = [...field.value].filter(label => label !== item)
    handleNonFormEventChange(newList, id)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className={styles.ListBuilder}>
      <div className={styles.search}>
        <TextInput
          value={value}
          label={label}
          id={id}
          onChange={onFieldUpdate}
          onKeyDown={onKeyDown}
          rightSection={<FaCheck className={styles.submit} />}
        />
      </div>
      {display === 'chip' ? (
        <ChipDisplay onDelete={onDelete} onEdit={onEdit} items={field.value} />
      ) : (
        <ListDisplay onDelete={onDelete} onEdit={onEdit} items={field.value} />
      )}
    </div>
  )
}

export default ListBuilder

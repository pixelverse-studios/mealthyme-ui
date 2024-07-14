import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { Button, Chip } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { RecipeFormProps, ListInputProps } from '../../../utils/types/fields'
import { TextField } from '../../fields'
import styles from './RecipeForm.module.scss'

interface ListDisplayProps {
  items: string[]
  onDelete: (value: string) => void
}

const ListDisplay = ({ items, onDelete }: ListDisplayProps) => {
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
            <div>
              <span className={styles.order}>{padded}</span>
              <span className={styles.instruction}>{item}</span>
            </div>
            <DeleteForever onClick={() => onDelete(item)} />
          </div>
        )
      })}
    </div>
  )
}

const ChipDisplay = ({ items, onDelete }: ListDisplayProps) => {
  if (items?.length === 0) {
    return <div className={styles.ChipDisplay} />
  }
  return (
    <div className={styles.ChipDisplay}>
      {items.map((item: string, key: number) => (
        <Chip key={key} label={item} onDelete={() => onDelete(item)} />
      ))}
    </div>
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

  const onFieldUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  const onAdd = () => {
    const newList = [...field.value, value]
    handleNonFormEventChange(newList, id)
    setValue('')
  }

  const onDelete = (item: string) => {
    const newList = [...field.value].filter(label => label !== item)
    handleNonFormEventChange(newList, id)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAdd()
    }
  }

  return (
    <div className={styles.ListBuilder}>
      <div>
        <TextField
          field={{ value, msgType: '', message: '', valid: true }}
          id={id}
          label={label}
          onChange={onFieldUpdate}
          type="text"
          onKeyDown={onKeyDown}
          onBlur={() => null}
        />
        <Button onClick={onAdd}>Add</Button>
      </div>
      {display === 'chip' ? (
        <ChipDisplay onDelete={onDelete} items={field.value} />
      ) : (
        <ListDisplay onDelete={onDelete} items={field.value} />
      )}
    </div>
  )
}

export default ListBuilder

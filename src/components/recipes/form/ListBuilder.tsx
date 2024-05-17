import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { Paper, Button, Chip } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { TextField } from '@/components/fields'
import { RecipeFormProps, ListInputProps } from '@/utils/types/fields'
import styles from './RecipeForm.module.scss'

interface ListDisplayProps {
  items: string[]
  onDelete: (value: string) => void
}

const ListDisplay = ({ items, onDelete }: ListDisplayProps) => {
  if (items?.length === 0) {
    return <div>empty list {':('}</div>
  }

  return (
    <div>
      {items.map((item: string, key: number) => {
        const order = key + 1
        const padded = order.toString().padStart(2, '0')
        return (
          <div key={key}>
            <span className={styles.order}>{padded}</span>
            <span className={styles.instruction}>{item}</span>
            <DeleteForever onClick={() => onDelete(item)} />
          </div>
        )
      })}
    </div>
  )
}

const ChipDisplay = ({ items, onDelete }: ListDisplayProps) => {
  if (items?.length === 0) {
    return <div>empty bag of chips {':('}</div>
  }
  return (
    <div>
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
  validation: {
    test: (item: string) => boolean
    message: string
  }
}

const ListBuilder = ({
  label,
  id,
  field,
  handleNonFormEventChange,
  display,
  validation
}: ListBuilderProps) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const onFieldUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (!validation.test(value)) {
      setError(validation.message)
    } else {
      setError('')
    }

    setValue(value)
  }

  const onAdd = () => {
    const newList = [...field.value, value]
    handleNonFormEventChange(newList, id)
    setValue('')
    setError('')
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
    <Paper>
      <div>
        <TextField
          field={{ value, error }}
          id={id}
          label={label}
          onChange={onFieldUpdate}
          type="text"
          onKeyDown={onKeyDown}
        />
        <Button onClick={onAdd}>Add</Button>
      </div>
      {display === 'chip' ? (
        <ChipDisplay onDelete={onDelete} items={field.value} />
      ) : (
        <ListDisplay onDelete={onDelete} items={field.value} />
      )}
    </Paper>
  )
}

export default ListBuilder

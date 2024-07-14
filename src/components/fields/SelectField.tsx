import { FocusEventHandler } from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { FieldInputProps } from '../../utils/types/fields'
import { setColor } from './utils'

interface SelectFieldProps {
  field: FieldInputProps | null
  label: string
  onChange: (option: any) => void
  options: string[]
  disabled?: boolean
  onBlur: FocusEventHandler
}

const SelectField = ({
  disabled,
  field,
  label,
  onBlur,
  onChange,
  options
}: SelectFieldProps) => {
  const onSelect = (event: SelectChangeEvent<string>) =>
    onChange(event.target.value)

  return (
    <FormControl
      color={setColor(field)}
      error={field?.valid === false}
      disabled={disabled}>
      <InputLabel size="small" variant="standard">
        {label}
      </InputLabel>
      <Select
        onBlur={onBlur}
        onChange={onSelect}
        variant="standard"
        size="small"
        value={field?.value}>
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {!field?.valid ? null : (
        <FormHelperText id={label.toLowerCase()}>
          {field?.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default SelectField

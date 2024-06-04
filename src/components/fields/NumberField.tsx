import {
  TextField as MuiTextField,
  FormControl,
  FormHelperText,
  TextFieldVariants
} from '@mui/material'

import { setColor } from './utils'
import { FieldInputProps } from '@/utils/types/fields'
import { VALID_FLOATS } from '@/utils/validations/regex'

interface NumberFieldProps {
  field: FieldInputProps
  id: string
  label: string
  variant?: TextFieldVariants
  onChange: (data: any, name: string) => void
  min?: number
  max?: number
  disabled?: boolean
}
const NumberField = ({
  id,
  label,
  onChange,
  field,
  variant = 'standard',
  min,
  max,
  disabled
}: NumberFieldProps) => {
  const onValueChange = (e: any) => {
    const { value } = e.target
    let isValid = VALID_FLOATS.test(value) || value == ''
    if (min) {
      const isLessThan = parseFloat(value) < min
      if (isLessThan) isValid = false
    }
    if (max) {
      const isGreaterThan = parseFloat(value) > max
      if (isGreaterThan) isValid = false
    }
    if (isValid) {
      onChange(value, id)
    }
  }
  return (
    <FormControl color={setColor(field)} error={Boolean(field.error)}>
      <MuiTextField
        disabled={disabled}
        size="small"
        color={setColor(field)}
        variant={variant}
        id={id}
        name={id}
        label={label}
        title={label}
        onChange={onValueChange}
        value={field.value}
      />
      <FormHelperText id={id}>{field.error}</FormHelperText>
    </FormControl>
  )
}

export default NumberField

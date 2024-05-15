import {
  TextField as MuiTextField,
  FormControl,
  FormHelperText
} from '@mui/material'

import { setColor } from './utils'
import { TextFieldProps } from '@/utils/types/fields'

const CHARACTER_COUNT = 600
interface TextFieldTypes extends TextFieldProps {
  rows?: number
  required?: boolean
  hideHelperText?: boolean
}
const TextField = ({
  id,
  label,
  type,
  onChange,
  field,
  rows,
  required,
  variant = 'outlined',
  hideHelperText = true
}: TextFieldTypes) => {
  const isTextArea = type === 'textarea'
  return (
    <FormControl color={setColor(field)} error={Boolean(field.error)}>
      <MuiTextField
        size="small"
        color={setColor(field)}
        multiline={isTextArea}
        inputProps={{
          maxLength: isTextArea ? CHARACTER_COUNT : 999999999
        }}
        variant={variant}
        type={type}
        id={id}
        name={id}
        label={label}
        title={label}
        onChange={onChange}
        value={field.value}
        required={required}
        rows={isTextArea ? rows : ''}
      />
      <FormHelperText id={id}>{field.error}</FormHelperText>
      {isTextArea && !hideHelperText && (
        <FormHelperText id={id}>
          Max Characters: {field.value.length}/{CHARACTER_COUNT}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default TextField

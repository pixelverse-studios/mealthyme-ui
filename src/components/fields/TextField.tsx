import {
  TextField as MuiTextField,
  FormControl,
  FormHelperText
} from '@mui/material'

import { setColor } from './utils'
import { TextFieldProps } from '../../utils/types/fields'

const CHARACTER_COUNT = 600
export interface TextFieldTypes extends TextFieldProps {
  rows?: number
  required?: boolean
  hideHelperText?: boolean
  onKeyUp?: any
}
const TextField = ({
  disabled = false,
  field,
  hideHelperText = true,
  id,
  label,
  onBlur,
  onChange,
  onKeyDown,
  onKeyUp,
  required,
  rows,
  type,
  variant = 'standard'
}: TextFieldTypes) => {
  const isTextArea = type === 'textarea'

  return (
    <FormControl color={setColor(field)} error={field.valid === false}>
      <MuiTextField
        error={field.valid === false}
        color={setColor(field)}
        disabled={disabled}
        id={id}
        inputProps={{
          maxLength: isTextArea ? CHARACTER_COUNT : 999999999
        }}
        label={label}
        multiline={isTextArea}
        name={id}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        required={required}
        rows={isTextArea ? rows : ''}
        size="small"
        title={label}
        type={type}
        value={field.value}
        variant={variant}
      />
      {field.valid ? null : (
        <FormHelperText id={id}>{field.message}</FormHelperText>
      )}
      {isTextArea && !hideHelperText && (
        <FormHelperText id={id}>
          Max Characters: {field.value.length}/{CHARACTER_COUNT}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default TextField

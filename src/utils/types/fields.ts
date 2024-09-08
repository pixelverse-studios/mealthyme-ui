import {
  ChangeEventHandler,
  KeyboardEventHandler,
  FocusEventHandler
} from 'react'

export interface FieldInputProps {
  value: string
  msgType: string
  valid: boolean
  message: string
}

export interface ListInputProps {
  value: string[]
  error: string
}

export interface TextFieldProps {
  field: FieldInputProps
  id: string
  type?: 'text' | 'email' | 'textarea' | 'password' | 'file'
  label: string
  onChange: ChangeEventHandler
  disabled?: boolean
  onBlur: FocusEventHandler
  onKeyDown?: KeyboardEventHandler
  variant?: 'outlined' | 'standard' | 'filled'
}

export interface RecipeFormProps {
  form: any
  handleChange: ChangeEventHandler
  handleNumberChange: (value: number | string, id: string) => void
  handleNonFormEventChange: (data: any, name: string) => void
  handleValidation: FocusEventHandler
}

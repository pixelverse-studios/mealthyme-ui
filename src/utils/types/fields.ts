import { ChangeEventHandler, KeyboardEventHandler } from 'react'

export interface FieldInputProps {
  value: string
  error: string
}

export interface ListInputProps {
  value: string[]
  error: string
}

export interface TextFieldProps {
  field: FieldInputProps
  id: string
  type: 'text' | 'email' | 'textarea' | 'password' | 'file'
  label: string
  onChange: ChangeEventHandler
  disabled?: boolean
  onKeyDown?: KeyboardEventHandler
  variant?: 'outlined' | 'standard' | 'filled'
}

export interface RecipeFormProps {
  form: any
  handleChange: ChangeEventHandler
  handleNonFormEventChange: (data: any, name: string) => void
}

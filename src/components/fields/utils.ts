import { FieldInputProps } from '../../utils/types/fields'

export const setColor = (
  field: FieldInputProps | null
): 'primary' | 'error' | 'success' => {
  if (field == null) return 'primary'
  if (field.value === '' && field.msgType === '') {
    return 'primary'
  }

  if (field.msgType === 'error') {
    return 'error'
  }

  if (field.value && !field.msgType) {
    return 'primary'
  }

  return 'primary'
}

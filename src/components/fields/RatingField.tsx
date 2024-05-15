import { Rating, FormControl, FormHelperText, Typography } from '@mui/material'
import { setColor } from './utils'

interface RatingProps {
  field: { value: string; error: string }
  id: string
  label: string
  onChange: (data: any, label: string) => void
}

const RatingField = ({ field, id, label, onChange }: RatingProps) => {
  const color = setColor(field)
  return (
    <FormControl color={color} error={Boolean(field.error)}>
      <Typography component="legend">{label}</Typography>
      <Rating
        color={color}
        id={id}
        onChange={(e, newValue) => onChange(newValue, id)}
        value={parseFloat(field.value)}
      />
      <FormHelperText id={id}>{field.error}</FormHelperText>
    </FormControl>
  )
}

export default RatingField

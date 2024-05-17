import { ReactNode } from 'react'
import {
  Box,
  Rating,
  FormControl,
  FormHelperText,
  Typography
} from '@mui/material'
import { setColor } from './utils'
import styles from './Fields.module.scss'

interface RatingProps {
  field: { value: string; error: string }
  id: string
  label: string
  onChange: (data: any, label: string) => void
  icon: ReactNode
  emptyIcon: ReactNode
}

const RatingField = ({
  field,
  id,
  label,
  onChange,
  icon,
  emptyIcon
}: RatingProps) => {
  const color = setColor(field)
  return (
    <Box>
      <FormControl
        className={styles.RatingField}
        color={color}
        error={Boolean(field.error)}>
        <Typography component="legend">{label}</Typography>
        <Rating
          color={color}
          id={id}
          onChange={(e, newValue) => onChange(newValue, id)}
          value={parseFloat(field.value) === 0 ? null : parseFloat(field.value)}
          icon={icon}
          emptyIcon={emptyIcon}
          precision={0.5}
        />
        <FormHelperText id={id}>{field.error}</FormHelperText>
      </FormControl>
    </Box>
  )
}

export default RatingField

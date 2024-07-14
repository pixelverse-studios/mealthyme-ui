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
  field: {
    value: string
    valid: boolean
    msgType: string
    message: string
  }
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
        error={Boolean(field.valid === false)}>
        <Typography component="legend">{label}</Typography>
        <Rating
          color={color}
          id={id}
          onChange={(e, newValue) => onChange(newValue, id)}
          value={parseFloat(field.value) === 0 ? null : parseFloat(field.value)}
          icon={icon}
          emptyIcon={emptyIcon}
        />
        {field.valid === false ? (
          <FormHelperText id={id}>{field.message}</FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  )
}

export default RatingField

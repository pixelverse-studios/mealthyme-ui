import { Card as MuiCard } from '@mui/material'

import styles from './Elements.module.scss'

const Card = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => (
  <MuiCard className={`${styles.Card} ${className}`} variant="outlined">
    {children}
  </MuiCard>
)

export default Card

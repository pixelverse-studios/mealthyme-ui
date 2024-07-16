import { LinearProgress, CircularProgress } from '@mui/material'
import styles from './Elements.module.scss'

interface LoaderProps {
  loading: boolean
}

export const LinearLoader = ({ loading }: LoaderProps) =>
  loading ? (
    <div className={styles.LinearLoader}>
      <LinearProgress />
    </div>
  ) : null

export const RadialLoader = ({ loading }: LoaderProps) =>
  loading ? (
    <div className={styles.RadialLoader}>
      <CircularProgress />
    </div>
  ) : null

export const IconLoader = ({ loading }: LoaderProps) =>
  loading ? (
    <div className={styles.IconLoader}>
      <div className={styles.agPreload}></div>
    </div>
  ) : null

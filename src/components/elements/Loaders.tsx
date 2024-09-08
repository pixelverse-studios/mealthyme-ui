import styles from './Elements.module.scss'

interface LoaderProps {
  loading: boolean
}

export const IconLoader = ({ loading }: LoaderProps) =>
  loading ? (
    <div className={styles.IconLoader}>
      <div className={styles.agPreload}></div>
    </div>
  ) : null

export const FourDotsLoader = ({ loading }: LoaderProps) =>
  loading ? <div className={styles.loader} /> : null
